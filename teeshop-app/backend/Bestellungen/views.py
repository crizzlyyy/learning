from django.shortcuts import render
from rest_framework import generics
from .models import Bestellungen
from .serializers import BestellungenAPIserializer
from rest_framework.permissions import IsAuthenticated
from Mitarbeiter.models import Mitarbeiter
from Kunden.models import Kunden
from django.db.models import Sum
from django.http import JsonResponse
# Create your views here.

class BestellungenAPIView(generics.ListCreateAPIView):
    queryset = Bestellungen.objects.all()
    serializer_class = BestellungenAPIserializer
    permission_classes = [IsAuthenticated]

class BestellungenDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bestellungen.objects.all()
    serializer_class = BestellungenAPIserializer
    permission_classes = [IsAuthenticated]
 

def Dashboard(request):
    umsatz_gesamt = Bestellungen.objects.aggregate(umsatz=Sum("preis"))["umsatz"] or 0
    mitarbeiter_anzahl = Mitarbeiter.objects.count()
    umsatz_mitarbeiter = umsatz_gesamt/mitarbeiter_anzahl if mitarbeiter_anzahl > 0 else 0
    bestellung_gesamt = Bestellungen.objects.count()
    offene_bestellungen = Bestellungen.objects.filter(bestellungAbgeschlossen=False).count()


    
    gesamtumsatz_kunde = [
        Bestellungen.objects.filter(kundenNummer=str(kunde.kundenNummer)).aggregate(Sum("preis"))["preis__sum"] or 0
        for kunde in Kunden.objects.all()
    ]
 
   
    gesamtbestellungen_kunde = [
        Bestellungen.objects.filter(kundenNummer=str(kunde.kundenNummer)).count()
        for kunde in Kunden.objects.all()
    ]
 
   
    umsatz_pro_bestellung = [
        (umsatz / bestellungen) if bestellungen > 0 else 0
        for umsatz, bestellungen in zip(gesamtumsatz_kunde, gesamtbestellungen_kunde)
    ]
 
   
    beste_kunden = sorted(
        zip(Kunden.objects.all(), gesamtumsatz_kunde, gesamtbestellungen_kunde, umsatz_pro_bestellung),
        key=lambda x: x[1], reverse=True  
    )[:5]  
 
   
    beste_kunden_data = [
        {
            "kundennummer": kunde.kundenNummer,
            "gesamtumsatz": umsatz,
            "anzahl_bestellungen": bestellungen,
            "umsatz_pro_bestellung": round(umsatz_per_order, 2)
        }
        for kunde, umsatz, bestellungen, umsatz_per_order in beste_kunden
    ]


    context = {
        "umsatz_gesamt" : umsatz_gesamt,
        "umsatz_mitarbeiter" : umsatz_mitarbeiter,
        "bestellung_gesamt" : bestellung_gesamt,
        "offene_bestellungen" : offene_bestellungen,
        "beste_kunden_data" : beste_kunden_data,
       }
    return JsonResponse(context)
