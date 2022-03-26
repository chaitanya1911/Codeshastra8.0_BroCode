from rest_framework import serializers
from .models import Contractor
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields='__all__'

