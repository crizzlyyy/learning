from django.shortcuts import render
from rest_framework import generics
from .models import Lagerbestand
from .serializers import LagerbestandAPIserializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views import View
from django.db.models import F
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

# Create your views here.

class LagerbestandAPIview(generics.ListCreateAPIView):
    queryset = Lagerbestand.objects.all()
    serializer_class = LagerbestandAPIserializer
    permission_classes = [IsAuthenticated]

class LagerbestandDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lagerbestand.objects.all()
    serializer_class = LagerbestandAPIserializer
    permission_classes = [IsAuthenticated]

def get(request):
    minBestandSoon = Lagerbestand.objects.filter(menge__lte = F("minBestand") + 5)
    data = list(minBestandSoon.values("artikelNr", "artikel", "menge", "minBestand"))
    return JsonResponse({"minBestandSoon" : data})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "Du bist eingeloggt!"})