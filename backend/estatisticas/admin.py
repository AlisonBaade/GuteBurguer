from django.contrib import admin
from estatisticas.models import RegistroAcesso


@admin.register(RegistroAcesso)
class RegistroAcessoAdmin(admin.ModelAdmin):
    list_display = ('data', 'dispositivo', 'caminho')
    list_filter = ('dispositivo', 'data')
    search_fields = ('caminho',)
    readonly_fields = ('data', 'hash_visitante', 'dispositivo', 'caminho')

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
