from django.db import models

# Create your models here.


class Produktkatalog(models.Model):
    artikelNr = models.AutoField(primary_key=True)
    artikel = models.CharField(max_length=500)
    beschreibung = models.CharField(max_length=100)
    preis = models.FloatField()

    def __str__(self):
        return f"{self.artikelNr} {self.artikel} {self.preis}"
