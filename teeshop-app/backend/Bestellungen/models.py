from django.db import models
from Kunden.models import Kunden


# Create your models here.

class Bestellungen(models.Model):
    bestellNr = models.AutoField(primary_key=True)
    bestellungAbgeschlossen = models.BooleanField()
    preis = models.FloatField() 
    kundenNummer = models.CharField(max_length=50)
    


    def __str__(self):
        status = "abgeschlossen" if self.bestellungAbgeschlossen else "offen"
        return f"{self.bestellNr} {status}"