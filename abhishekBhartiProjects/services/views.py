from django.shortcuts import render, get_object_or_404
from home.models import Project
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectSerializer

class ProjectsList(APIView):

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)

        return Response(serializer.data)

    def post(self):
        pass