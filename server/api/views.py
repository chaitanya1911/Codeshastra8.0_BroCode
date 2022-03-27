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
import time
import cloudinary.search
from django.core.mail import send_mail,EmailMultiAlternatives
from django.template.loader import get_template

from .serializers import ContactSerializer, ProjectSerializer,WorkerSerializer

from . models import Aadhar, Contractor,Project, Worker,Owner
import numpy as np
import pytesseract
import os
import cv2
import torch

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
            contract = Worker.objects.get(id=data['id'])
            contract.verified = True
            contract.aadhar = data['number']
            contract.save()
            return JsonResponse({'done':1},safe=False)
        else:    
            return JsonResponse({'done':0},safe=False)

@csrf_exempt
def createProj(request):
    if request.method == "POST":
        data= JSONParser().parse(request)['data']
        print(data)
        contract = Contractor.objects.get(id=data['contractor'])
        proj = Project.objects.create(name=data['name'],desc=data['desc'],location={'lats':data['lats'],'lng':data['long']},start=data['date'],contractor=contract)
        
        try:
            imgU=cloudinary.uploader.upload(data['photo'],folder='codeshastra/projects/${0}'.format(proj.id),invalidate_caches=True,overwrite=True,resource_type='image')
            imgId=imgU['url']
        except:
            imgId=None
        proj.photo=imgId
        contract.occupied=True
        contract.save()
        proj = Project.objects.create(name=data['name'],desc=data['desc'],location={'lats':data['lats'],'lng':data['long']},start=data['date'],contractor=contract)
        proj.save()
        return JsonResponse("created",safe=False)  

@csrf_exempt
def vv(request):
    model = torch.hub.load('ultralytics/yolov5', 'custom', 'yolov5/best.pt') 
    im = 'C:/Users/Jainam/Desktop/trial.jpg'
    results = model(im)
    print(results)
    a = results.pandas().xyxy[0]
    print(a['name'].value_counts())
    os.system('python yolov5/detect.py --source C:/Users/Jainam/Desktop/trial.jpg --weights yolov5/best.pt')
    return JsonResponse("created",safe=False)  

@csrf_exempt
def ocr(request):
    # if request.method == "GET":
    #     img = cv2.imread('../server/api/images/ocr1.JPG')
    #     orb = cv2.ORB_create(500)
    #     kp1,des1 = orb.detectAndCompute(img,None)
    #     impkp1 = cv2.drawKeypoints(img,kp1,None)
    #     per=25
    #     img2 = cv2.imread('../server/api/images/ocr3.JPG')
    #     img2 = cv2.resize(img2,(418,365))
    #     kp2,des2 = orb.detectAndCompute(img2,None)
    #     bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    #     matches = bf.match(des2,des1)
    #     matches = list(matches)
    #     matches.sort(key=lambda x: x.distance)
    #     good = matches[:int(len(matches)*(per/100))]
    #     imgMatch = cv2.drawMatches(img2,kp2,img,kp1,good[:150],None,flags=2)
    #     srcPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    #     dstPoints = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1,1,2)
    #     M,_ = cv2.findHomography(srcPoints,dstPoints,cv2.RANSAC,5.0)
    #     imgScan = cv2.warpPerspective(img2,M,(465,318))
    #     roi = [[(140, 30), (300, 80), 'text', 'Date'], 
    #         [(20, 100), (160, 250), 'text', 'Name'], 
    #         [(170, 100), (280, 250), 'text', 'Start Time'], 
    #         [(280, 100), (400, 250), 'text', 'Exit Time']]

    #     imgShow = imgScan.copy()
    #     imgMask = np.zeros_like(imgShow)
    #     dt = []
    #     nm=[]
    #     start = []
    #     end = []
    #     for x,r in enumerate(roi):
    #         cv2.rectangle(imgMask,((r[0][0]),r[0][1]),((r[1][0]),r[1][1]),(0,255,0),cv2.FILLED)
    #         imgShow = cv2.addWeighted(imgShow,0.99,imgMask,0.6,0)
    #         imgCrop = imgScan[r[0][1]:r[1][1],r[0][0]:r[1][0]]
    #         if r[3]=='Start Time':
    #             start.append(pytesseract.image_to_string(imgCrop))
    #         elif r[3]=='Exit Time':
    #             end.append(pytesseract.image_to_string(imgCrop))
    #         elif r[3]=='Name':
    #             nm.append(pytesseract.image_to_string(imgCrop))
    #         else:
    #             dt.append(pytesseract.image_to_string(imgCrop))
        
    #     print(f'Names : {nm}')
    #     print(f'Start : {start}')
    #     print(f'Exit : {end}')
    #     print(f'Date : {dt}')


        # [
        #     {'name':'Chaitanya','start':'12:00','end':'01:00'},
        #     {'name':'Jainam','start':'02:20','end':'04:00'},
        #     {'name':'Manan','start':'12:00','end':'02:00'},
        #     {'name':'Alankrit','start':'11:00','end':'20:00'},

        # ]
        # 'data':[
        #     {'name':'Chaitanya','start':'12:00','end':'01:00'},
        #     {'name':'Jainam','start':'02:20','end':'04:00'},
        #     {'name':'Manan','start':'12:00','end':'02:00'},
        #     {'name':'Alankrit','start':'11:00','end':'20:00'},

        # ],'Date':'27-03-2022'
        time.sleep(3)
        return JsonResponse({'data':[['ck','12:00','12:00'],['ck','12:00','12:00'],['ck','12:00','12:00'],['ck','12:00','12:00']]},safe=False) 
@csrf_exempt
def getContractors(request):
    if request.method == "GET":
        c=Contractor.objects.filter(occupied=False)
        c=ContactSerializer(c,many=True).data
        return JsonResponse({'data':c},safe=False)  

@csrf_exempt
def getprojworkers(request,id):
    if request.method=="GET":
        contractor = Contractor.objects.get(id=int(id))
        workers = Worker.objects.filter(Contractor=contractor)
        free = Worker.objects.all().exclude(Contractor=contractor)
        workers = WorkerSerializer(workers,many=True).data
        free = WorkerSerializer(free,many=True).data
        return JsonResponse({'workers':workers,'free':free},safe=False)

@csrf_exempt
def assignworker(request,id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        contractor = Contractor.objects.get(id=data['cid'])
        wo = Worker.objects.get(id=data['wid'])
        wo.Contractor = contractor
        wo.save()
        return JsonResponse("added",safe=False)
    elif request.method=="DELETE":
        worker = Worker.objects.get(id=id)
        worker.Contractor = None
        worker.save()
        return JsonResponse("Deleted",safe=False) 

def getprojects(request):
    if request.method == "GET":
        projects = Project.objects.all()
        projects = ProjectSerializer(projects,many=True).data
        return JsonResponse({'projects':projects},safe=False)

def getWProf(request,id):
    if request.method=="GET":
        worker = Worker.objects.filter(id=int(id))
        worker = WorkerSerializer(worker,many=True).data
        return JsonResponse({'worker':worker[0]},safe=False)         

  


  


