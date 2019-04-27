from django.db import models

# Create your models here.

class Home(models.Model):
    mainText = models.CharField(max_length=1000)
    subText = models.CharField(max_length=2000)
    ctaText = models.CharField(max_length=500)
    ctaUrl = models.CharField(max_length=1000)
    backgroundUrl = models.CharField(max_length=1000)

    def __str__(self):
        return self.mainText

class About(models.Model):
    mainText = models.CharField(max_length=1000)
    subText = models.CharField(max_length=2000)
    ctaText = models.CharField(max_length=500)
    ctaUrl = models.CharField(max_length=1000)

    def __str__(self):
        return self.mainText

class Service(models.Model):
    iconUrl = models.CharField(max_length=1000)
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=1000)
    link = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
