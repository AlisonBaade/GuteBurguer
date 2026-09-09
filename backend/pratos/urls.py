from django.urls import path
from pratos.views import PratosV1, CategoriasV1


urlpatterns = [
    path('pratos/', PratosV1.as_view({'get': 'list'})),
    path('categorias/', CategoriasV1.as_view({'get': 'list'})),
]
