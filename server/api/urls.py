from django.urls import path
from . import views

urlpatterns = [
    path('api/login',views.login),
    path('api/signup',views.signup),
    path('api/generateotp',views.otp),
    path('api/verifyotp',views.verifyotp),
    path('api/createproj',views.createProj),
    path('api/getContract',views.getContractors),
    path('api/ocr',views.ocr),
]