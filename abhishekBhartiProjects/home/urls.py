from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home_index"),
    path('home', views.index, name="home_index"),
    path('allservices/', views.ServicesList.as_view()),
]
