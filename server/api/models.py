from django.db import models

class Project(models.Model):
    name= models.CharField(max_length=150)
    location = models.JSONField()
    start = models.TimeField()
    end = models.TimeField()

class Owner(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=10)
    address = models.TextField()


class Contractor(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    aadhar = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    address = models.TextField()


class Worker(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    aadhar = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    address = models.TextField()

class Attendance(models.Model):
    worker = models.ForeignKey(Worker,on_delete=models.CASCADE)
    project = models.ForeignKey(Project,on_delete=models.CASCADE)
    entry = models.TimeField(null=True,blank=True)
    exit = models.TimeField(null=True,blank=True)
    date = models.DateField()


