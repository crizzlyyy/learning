from django.shortcuts import render
from .models import Kunden
from rest_framework import generics
from .serializers import KundenAPIserializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

# Create your views here.

class KundenAPIView(generics.ListCreateAPIView):

    queryset = Kunden.objects.all()
    serializer_class = KundenAPIserializer
    permission_classes = [IsAuthenticated]

class KundenDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Kunden.objects.all()
    serializer_class = KundenAPIserializer
    permission_classes = [IsAuthenticated]

def get_kundennummern(request):
    kundennummern = list(Kunden.objects.values_list('kundenNummer', flat=True)) 
    return JsonResponse(kundennummern, safe=False)