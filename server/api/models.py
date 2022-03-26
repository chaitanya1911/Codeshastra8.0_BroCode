from atexit import register
from signal import default_int_handler
from django.db import models

# class Project(models.Model):
#     name= models.CharField(max_length=150)
#     location = models.JSONField()
#     start = models.TimeField()
#     end = models.TimeField()

# class Owner(models.Model):
#     name = models.CharField(max_length=150)
#     email = models.EmailField()
#     photo = models.CharField(max_length=300)
#     phone = models.CharField(max_length=12)
#     gender = models.CharField(max_length=10)
#     address = models.TextField()


# class Contractor(models.Model):
#     name = models.CharField(max_length=150)
#     email = models.EmailField()
#     photo = models.CharField(max_length=300)
#     phone = models.CharField(max_length=12)
#     aadhar = models.CharField(max_length=20)
#     gender = models.CharField(max_length=10)
#     address = models.TextField()


# class Worker(models.Model):
#     name = models.CharField(max_length=150)
#     email = models.EmailField()
#     photo = models.CharField(max_length=300)
#     phone = models.CharField(max_length=12)
#     aadhar = models.CharField(max_length=20)
#     gender = models.CharField(max_length=10)
#     address = models.TextField()
#     verified = models.BooleanField(default=False)
#     aadhar = models.CharField(max_length=20,null=True,blank=True)

# class Attendance(models.Model):
#     worker = models.ForeignKey(Worker,on_delete=models.CASCADE)
#     project = models.ForeignKey(Project,on_delete=models.CASCADE)
#     entry = models.TimeField(null=True,blank=True)
#     exit = models.TimeField(null=True,blank=True)
#     date = models.DateField()

class Aadhar(models.Model):
    number = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    first_name = models.CharField(max_length=100)
    email = models.EmailField(null=True,blank=True)
    otp = models.IntegerField(null=True,blank=True)
    registered = models.BooleanField(default=False)
    def __str__(self):
        return self.first_name

    


