from django.db import models

# Create your models here.


class Mitarbeiter(models.Model):
    mitarbeiterId = models.AutoField(primary_key=True)
    nachname = models.CharField(max_length=50)
    vorname = models.CharField(max_length=50)
    strasse = models.CharField(max_length=50)
    hausNr = models.CharField(max_length=50)
    ort = models.CharField(max_length=50)
    plz = models.IntegerField()
    telefonNr = models.CharField(max_length=50)
    gehalt = models.FloatField()
    vertragSeit = models.DateField()
    vertragBis = models.DateField()

    def __str__(self):
        return f"{self.mitarbeiterId} {self.nachname} {self.vertragBis}"