from django.shortcuts import render, get_object_or_404
from .models import Home, About, Service, Project
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ServiceSerializer


# Lists all services or create new service
# allservices/
class ServicesList(APIView):
    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    def post(self):
        pass



def index(request):

    context = {
        'title': 'Home',
        'home': Home.objects.all()[0],
        'about': About.objects.all()[0],
        'services': Service.objects.all(),
        'projects': Project.objects.all(),
    }

    return render(request, "home/index.html", context)
