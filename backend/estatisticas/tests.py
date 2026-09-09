import hashlib
import hmac
from datetime import timedelta

from django.core.management import call_command
from django.test import TestCase, override_settings
from django.utils import timezone

from estatisticas.models import RegistroAcesso


@override_settings(VISITOR_HASH_KEY='visitor-test-key')
class RegistroAcessoTests(TestCase):
    def test_registro_usa_hmac_e_limita_caminho(self):
        response = self.client.post(
            '/api/registrar-acesso/',
            {'caminho': '/' + ('a' * 150)},
            content_type='application/json',
            HTTP_X_FORWARDED_FOR='198.51.100.10',
            HTTP_USER_AGENT='GuteTest/1.0',
        )

        self.assertEqual(response.status_code, 200)
        registro = RegistroAcesso.objects.get()
        esperado = hmac.new(
            b'visitor-test-key',
            f'198.51.100.10|GuteTest/1.0|{timezone.now():%Y-%m-%d}'.encode(),
            hashlib.sha256,
        ).hexdigest()
        self.assertEqual(registro.hash_visitante, esperado)
        self.assertEqual(len(registro.caminho), 100)

    def test_estatisticas_exigem_administrador(self):
        response = self.client.get('/api/estatisticas-acesso/')
        self.assertEqual(response.status_code, 403)

    @override_settings(ACCESS_LOG_RETENTION_DAYS=90)
    def test_expurgo_respeita_retencao(self):
        antigo = RegistroAcesso.objects.create(hash_visitante='a' * 64)
        RegistroAcesso.objects.filter(pk=antigo.pk).update(
            data=timezone.now() - timedelta(days=91)
        )
        RegistroAcesso.objects.create(hash_visitante='b' * 64)

        call_command('purge_access_logs')

        self.assertEqual(RegistroAcesso.objects.count(), 1)
        self.assertEqual(RegistroAcesso.objects.get().hash_visitante, 'b' * 64)
