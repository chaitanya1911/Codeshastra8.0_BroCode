from django.urls import path
from . import views

urlpatterns = [
    path('api/login',views.login),
    path('api/signup',views.signup),
]