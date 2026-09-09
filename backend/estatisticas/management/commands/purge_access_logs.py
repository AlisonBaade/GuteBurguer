from datetime import timedelta

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from estatisticas.models import RegistroAcesso


class Command(BaseCommand):
    help = 'Remove registros de acesso mais antigos que a retenção configurada'

    def handle(self, *args, **options):
        limite = timezone.now() - timedelta(days=settings.ACCESS_LOG_RETENTION_DAYS)
        removidos, _ = RegistroAcesso.objects.filter(data__lt=limite).delete()
        self.stdout.write(
            self.style.SUCCESS(
                f'{removidos} registro(s) removido(s); retenção de '
                f'{settings.ACCESS_LOG_RETENTION_DAYS} dias.'
            )
        )
