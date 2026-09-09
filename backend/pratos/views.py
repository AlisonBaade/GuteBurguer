from rest_framework import viewsets
from pratos.models import Prato, Categoria
from pratos.serializers import PratoSerializer, CategoriaSerializer


class PratosV1(viewsets.ReadOnlyModelViewSet):
    queryset = Prato.objects.all()
    serializer_class = PratoSerializer


class CategoriasV1(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
