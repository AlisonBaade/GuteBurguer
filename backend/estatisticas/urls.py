from django.urls import path
from estatisticas.views import registrar_acesso, obter_estatisticas_acesso

urlpatterns = [
    path('api/registrar-acesso/', registrar_acesso, name='registrar_acesso'),
    path('api/estatisticas-acesso/', obter_estatisticas_acesso, name='obter_estatisticas_acesso'),
]
