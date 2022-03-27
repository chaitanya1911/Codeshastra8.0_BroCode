from rest_framework import serializers
from .models import Contractor, Project,Worker
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields='__all__'

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields='__all__'   

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields='__all__'             

