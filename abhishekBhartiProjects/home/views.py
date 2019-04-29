from django.shortcuts import render, get_object_or_404
from .models import Home, About, Service, Project


def index(request):

    context = {
        'title': 'Home',
        'home': Home.objects.all()[0],
        'about': About.objects.all()[0],
        'services': Service.objects.all(),
        'projects': Project.objects.all(),
    }

    return render(request, "home/index.html", context)
