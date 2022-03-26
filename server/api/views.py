from django.conf import settings
from django.http.response import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User,auth
from random import randint
from django.core.mail import send_mail,EmailMultiAlternatives
from django.template.loader import get_template

from . models import Aadhar


class BlackListTokenView(APIView):
    permission_classes=[AllowAny]

    def post(self,request):
        try:
            refresh_token=request.data['refresh_token']
            token=RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def login(request):
    if request.method=="POST":
        data = JSONParser().parse(request)['data']
        username = data['username']
        userr = User.objects.get(username=username)
        idd=0
        type=3
        if userr.is_superuser ==True:
            # idd = Manager.objects.get(user=userr).id
            type=1
        elif userr.is_staff ==True:
            # idd = CManager.objects.get(user=userr).id
            type=2
        else:
            # idd= Worker.objects.get(user = userr).id
            type=3
        return JsonResponse({'type':type,'id':idd,'name':userr.first_name},safe=False)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = JSONParser().parse(request)['data']
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({"exists":1},safe=False)
        else:    
            user = User.objects.create(username=data['email'],email=data['email'],password=make_password(data['pass']),first_name=data['first_name'],last_name=data['last_name'])
            user.save()
            return JsonResponse({"exists":0},safe=False)

@csrf_exempt
def otp(request):
    if request.method == "POST":
        data = JSONParser().parse(request)['data']
        if Aadhar.objects.filter(number = data['number']).exists():
            otpp = randint(10000,99999)
            ad = Aadhar.objects.get(number = data['number'])
            subject = "Verification"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [data['email']]
            msg=EmailMultiAlternatives(subject=subject,from_email=email_from,to=recipient_list)
            args={}
            args["body"] = f'Your Otp is {otpp}'
            html_template=get_template("api/CustomMail.html").render(args)
            msg.attach_alternative(html_template,"text/html")
            msg.send()
            ad.otp = otpp
            ad.save()
            return JsonResponse({'exists':1},safe=False)
        else:
            return JsonResponse({'exists':0},safe=False)

@csrf_exempt
def verifyotp(request):
    if request.method =="POST":
        data = JSONParser().parse(request)['data']
        ad = Aadhar.objects.get(number = data['number'])
        if ad.otp == int(data['otp']):
            # userr = User.objects.get(email=data['email'])
            ad.registered = True
            ad.save()
            return JsonResponse({'done':1},safe=False)
        else:    
            return JsonResponse({'done':0},safe=False)
  


