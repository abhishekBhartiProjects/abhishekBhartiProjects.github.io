from django.db import models

class About(models.Model):
    mainText = models.CharField(max_length=100)
    subText = models.CharField(max_length=2000)
    ctaText = models.CharField(max_length=50)
    ctaUrl = models.CharField(max_length=500)

    def __str__(self):
        return self.mainText


