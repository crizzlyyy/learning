from django.db import models

# Create your models here.

class Kunden(models.Model):

    kundenNummer = models.AutoField(primary_key=True)
    vorname = models.CharField(max_length=50)
    nachname = models.CharField(max_length=50)
    strasse = models.CharField(max_length=50)
    hausNr = models.CharField(max_length=50)
    ort = models.CharField(max_length=50)
    plz = models.IntegerField()
    mailadresse = models.CharField(max_length=50)


    def __str__(self):
        return f"{self.kundenNummer} {self.nachname}"