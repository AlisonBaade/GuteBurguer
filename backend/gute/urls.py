"""
URL configuration for gute project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.http import HttpResponseNotFound
from django.views.static import serve


def admin_honeypot(request):
    return HttpResponseNotFound("<h1>404 Not Found</h1>")


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('admin/', admin_honeypot),
    path('', include('pratos.urls')),
    path('', include('estatisticas.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
