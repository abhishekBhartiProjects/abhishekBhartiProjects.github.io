from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ('pk', 'iconUrl', 'name', 'description', 'link') # list what values u want to return
        # fields = '__all__' #returns all fields including primaryKey

