from django.db import models
from Produktkatalog.models import Produktkatalog

# Create your models here.

class Lagerbestand(models.Model):
    artikelNr = models.AutoField(primary_key=True)
    artikel = models.CharField(max_length=50)
    menge = models.IntegerField()
    minBestand = models.IntegerField()

    def __str__(self):
        return f"{self.artikelNr} {self.artikel} {self.menge}"