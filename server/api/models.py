from django.db import models

class Contractor(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    aadhar = models.CharField(max_length=20)
    verified = models.BooleanField(default=False)
    gender = models.CharField(max_length=10)
    address = models.TextField()
    occupied=models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Project(models.Model):
    contractor = models.ForeignKey(Contractor,on_delete=models.SET_NULL,null=True)
    name= models.CharField(max_length=150)
    desc = models.TextField()
    location = models.JSONField()
    start = models.DateField()
    end = models.DateField(null=True,blank=True)
    def __str__(self):
        return self.name

class Owner(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=10)
    address = models.TextField()
    def __str__(self):
        return self.name


class Worker(models.Model):
    Contractor = models.ForeignKey(Contractor,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    photo = models.CharField(max_length=300)
    phone = models.CharField(max_length=12)
    gender = models.CharField(max_length=10)
    address = models.TextField()
    verified = models.BooleanField(default=False)
    aadhar = models.CharField(max_length=20,null=True,blank=True)
    def __str__(self):
        return self.name

class Attendance(models.Model):
    worker = models.ForeignKey(Worker,on_delete=models.CASCADE)
    project = models.ForeignKey(Project,on_delete=models.CASCADE)
    entry = models.TimeField(null=True,blank=True)
    exit = models.TimeField(null=True,blank=True)
    date = models.DateField()
    def __str__(self):
        return f'{self.project.name}-{self.worker.name}'

class Aadhar(models.Model):
    number = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    first_name = models.CharField(max_length=100)
    email = models.EmailField(null=True,blank=True)
    otp = models.IntegerField(null=True,blank=True)
    registered = models.BooleanField(default=False)
    def __str__(self):
        return self.first_name

class Violation(models.Model):
    project = models.ForeignKey(Project,on_delete=models.CASCADE)
    contractor = models.ForeignKey(Contractor,on_delete=models.CASCADE)
    date = models.DateField()
    count = models.IntegerField()


    


