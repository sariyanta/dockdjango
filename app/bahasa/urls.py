from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="bahasa-index"),
    path('kamus', views.kamus, name="bahasa-kamus")
]