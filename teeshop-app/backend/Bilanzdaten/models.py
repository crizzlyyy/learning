from django.db import models

# Create your models here.
class Bilanzdaten(models.Model):

    umsatz = models.FloatField()
    gewinn = models.FloatField()


    def __str__(self):
        return f"{self.umsatz} {self.gewinn}"