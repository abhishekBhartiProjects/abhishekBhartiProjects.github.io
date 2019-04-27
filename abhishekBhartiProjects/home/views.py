from django.shortcuts import render, get_object_or_404


def index(request):

    context = {
        'title': 'Home',
    }

    return render(request, "home/index.html", context)
