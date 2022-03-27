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
import cloudinary
import cloudinary.search
from django.core.mail import send_mail,EmailMultiAlternatives
from django.template.loader import get_template

from .serializers import ContactSerializer

from . models import Aadhar, Contractor,Project, Worker,Owner
import numpy as np
import pytesseract
import os
import cv2

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe' #Install from Pytess

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
        photo=""
        email=""
        if userr.is_superuser ==True:
            ow  =Owner.objects.get(user=userr)
            idd = ow.id
            photo =ow.photo
            email = ow.email 
            type=1
        elif userr.is_staff ==True:
            cn = Contractor.objects.get(user=userr)
            idd = cn.id
            photo =cn.photo
            email = cn.email 
            type=2
        else:
            wo= Worker.objects.get(user = userr)
            idd = wo.id
            photo =wo.photo
            email = wo.email 
            type=3
        return JsonResponse({'type':type,'id':idd,'name':userr.first_name,'photo':photo,'email':email},safe=False)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = JSONParser().parse(request)['data']
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({"exists":1},safe=False)
        else:    
            
            try:
                imgU=cloudinary.uploader.upload(data['imgUrl'],folder='codeshastra'.format(data['email']),invalidate_caches=True,overwrite=True,resource_type='image')
                imgId=imgU['url']
            except:
                imgId=None
            user = User.objects.create(username=data['email'],email=data['email'],password=make_password(data['pass']),first_name=data['first_name'],last_name=data['last_name'])
            
            worker=Worker(user=user,email=data['email'],name=f"{data['first_name']} {data['last_name']}",photo=imgId,gender=data['gender'],address=data['address'],phone=data['phone'])
            user.save()
            worker.save()
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

@csrf_exempt
def createProj(request):
    if request.method == "POST":
        data= JSONParser().parse(request)['data']
        print(data)
        contract = Contractor.objects.get(id=data['contractor'])
        contract.occupied=True
        contract.save()
        proj = Project.objects.create(name=data['name'],desc=data['desc'],location={'lats':data['lats'],'lng':data['long']},start=data['date'],contractor=contract)
        proj.save()
        return JsonResponse("created",safe=False)  

@csrf_exempt
def ocr(request):
    if request.method == "GET":
        img = cv2.imread('../server/api/images/ocr1.JPG')
        orb = cv2.ORB_create(500)
        kp1,des1 = orb.detectAndCompute(img,None)
        impkp1 = cv2.drawKeypoints(img,kp1,None)
        per=25
        img2 = cv2.imread('../server/api/images/ocr3.JPG')
        img2 = cv2.resize(img2,(418,365))
        kp2,des2 = orb.detectAndCompute(img2,None)
        bf = cv2.BFMatcher(cv2.NORM_HAMMING)
        matches = bf.match(des2,des1)
        matches = list(matches)
        matches.sort(key=lambda x: x.distance)
        good = matches[:int(len(matches)*(per/100))]
        imgMatch = cv2.drawMatches(img2,kp2,img,kp1,good[:150],None,flags=2)
        srcPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
        dstPoints = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1,1,2)
        M,_ = cv2.findHomography(srcPoints,dstPoints,cv2.RANSAC,5.0)
        imgScan = cv2.warpPerspective(img2,M,(465,318))
        roi = [[(140, 30), (300, 80), 'text', 'Date'], 
            [(20, 100), (160, 250), 'text', 'Name'], 
            [(170, 100), (280, 250), 'text', 'Start Time'], 
            [(280, 100), (400, 250), 'text', 'Exit Time']]

        imgShow = imgScan.copy()
        imgMask = np.zeros_like(imgShow)
        dt = []
        nm=[]
        start = []
        end = []
        for x,r in enumerate(roi):
            cv2.rectangle(imgMask,((r[0][0]),r[0][1]),((r[1][0]),r[1][1]),(0,255,0),cv2.FILLED)
            imgShow = cv2.addWeighted(imgShow,0.99,imgMask,0.6,0)
            imgCrop = imgScan[r[0][1]:r[1][1],r[0][0]:r[1][0]]
            if r[3]=='Start Time':
                start.append(pytesseract.image_to_string(imgCrop))
            elif r[3]=='Exit Time':
                end.append(pytesseract.image_to_string(imgCrop))
            elif r[3]=='Name':
                nm.append(pytesseract.image_to_string(imgCrop))
            else:
                dt.append(pytesseract.image_to_string(imgCrop))
        
        print(f'Names : {nm}')
        print(f'Start : {start}')
        print(f'Exit : {end}')
        print(f'Date : {dt}')
                


        return JsonResponse("created",safe=False) 
@csrf_exempt
def getContractors(request):
    if request.method == "GET":
        c=Contractor.objects.filter(occupied=False)
        c=ContactSerializer(c,many=True).data
        return JsonResponse({'data':c},safe=False)  


  


