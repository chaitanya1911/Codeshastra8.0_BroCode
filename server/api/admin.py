from django.contrib import admin
from . models import Aadhar,Contractor, Owner,Project, Worker

admin.site.register(Aadhar)
admin.site.register(Contractor)
admin.site.register(Project)
admin.site.register(Worker)
admin.site.register(Owner)
