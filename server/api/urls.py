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
    path('api/getprojworkers/<int:id>',views.getprojworkers),
    path('api/assignworker',views.assignworker),
    path('api/assignworker/<int:id>',views.assignworker),
    path('api/getprojects',views.getprojects),
     path('api/vv',views.vv)
]