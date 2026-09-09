from django.contrib import admin
from pratos.models import Categoria, Prato


@admin.register(Prato)
class PratoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'preco', 'preco_promocional', 'promocao')
    list_filter = ('categoria', 'promocao')
    search_fields = ('nome', 'descricao')
    list_editable = ('preco', 'preco_promocional', 'promocao')


admin.site.register(Categoria)
