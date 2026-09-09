import hashlib
import hmac
from django.conf import settings
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import SimpleRateThrottle
from estatisticas.models import RegistroAcesso


def obter_ip_cliente(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[-1].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '')
    return ip


class RegistroAcessoThrottle(SimpleRateThrottle):
    """Limita abuso usando o IP normalizado da requisição."""

    scope = 'access-registration'

    def get_cache_key(self, request, view):
        ident = obter_ip_cliente(request)
        if not ident:
            return None
        return self.cache_format % {'scope': self.scope, 'ident': ident}


@api_view(['POST'])
@throttle_classes([RegistroAcessoThrottle])
def registrar_acesso(request):
    ip = obter_ip_cliente(request)
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    hoje_str = timezone.now().strftime('%Y-%m-%d')

    raw = f"{ip}|{user_agent}|{hoje_str}"
    hash_visitante = hmac.new(
        settings.VISITOR_HASH_KEY.encode('utf-8'),
        raw.encode('utf-8'),
        hashlib.sha256,
    ).hexdigest()

    ua_lower = user_agent.lower()
    if any(m in ua_lower for m in ['mobile', 'android', 'iphone', 'ipad']):
        dispositivo = 'Celular/Tablet'
    else:
        dispositivo = 'Computador'

    inicio_hoje = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
    ja_registrado = RegistroAcesso.objects.filter(
        hash_visitante=hash_visitante,
        data__gte=inicio_hoje
    ).exists()

    if not ja_registrado:
        caminho = request.data.get('caminho', '/') if hasattr(request, 'data') else '/'
        caminho = caminho if isinstance(caminho, str) else '/'

        RegistroAcesso.objects.create(
            hash_visitante=hash_visitante,
            dispositivo=dispositivo,
            caminho=caminho[:100],
        )

    return Response({
        "status": "sucesso",
        "registrado": not ja_registrado,
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
def obter_estatisticas_acesso(request):
    """Consumido pelo dashboard administrativo."""
    stats = RegistroAcesso.estatisticas_gerais()
    return Response(stats)
