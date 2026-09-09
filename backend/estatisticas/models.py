from django.db import models
from django.utils import timezone
import datetime


class RegistroAcesso(models.Model):
    data = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Data/Hora do Acesso")
    hash_visitante = models.CharField(max_length=64, db_index=True, verbose_name="Hash do Visitante")
    dispositivo = models.CharField(max_length=30, default="Desktop", verbose_name="Dispositivo")
    caminho = models.CharField(max_length=100, default="/", verbose_name="Página/Rota")

    class Meta:
        verbose_name = "Registro de Acesso"
        verbose_name_plural = "Registros de Acessos"
        ordering = ["-data"]

    def __str__(self):
        return f"Acesso em {self.data.strftime('%d/%m/%Y %H:%M')} ({self.dispositivo})"

    @classmethod
    def estatisticas_gerais(cls):
        agora = timezone.now()
        inicio_mes = agora.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        inicio_hoje = agora.replace(hour=0, minute=0, second=0, microsecond=0)
        trinta_dias_atras = agora - datetime.timedelta(days=30)

        total_mes = cls.objects.filter(data__gte=inicio_mes).count()
        total_hoje = cls.objects.filter(data__gte=inicio_hoje).count()
        total_30_dias = cls.objects.filter(data__gte=trinta_dias_atras).count()
        total_geral = cls.objects.count()

        return {
            "total_mes": total_mes,
            "total_hoje": total_hoje,
            "total_30_dias": total_30_dias,
            "total_geral": total_geral,
        }
