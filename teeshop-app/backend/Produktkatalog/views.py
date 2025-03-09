from django.shortcuts import render
from rest_framework import generics
from .models import Produktkatalog
from .serializers import ProduktkatalogAPIserializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

# Create your views here.

class ProduktkatalogAPIView(generics.ListCreateAPIView):
    queryset = Produktkatalog.objects.all()
    serializer_class = ProduktkatalogAPIserializer
    permission_classes = [IsAuthenticated]
    
class ProduktkatalogDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produktkatalog.objects.all()
    serializer_class = ProduktkatalogAPIserializer
    permission_classes = [IsAuthenticated]

def fetchArtikel(request):
    artikel = list(Produktkatalog.objects.values_list('artikel', flat=True)) 
    return JsonResponse(artikel, safe=False)