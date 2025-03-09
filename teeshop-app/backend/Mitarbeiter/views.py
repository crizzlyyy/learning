from django.shortcuts import render
from .models import Mitarbeiter
from rest_framework import generics
from .serializers import MitarbeiterAPIserializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class MitarbeiterAPIView(generics.ListCreateAPIView):
    queryset = Mitarbeiter.objects.all()
    serializer_class = MitarbeiterAPIserializer
    permission_classes = [IsAuthenticated]

class MitarbeiterDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mitarbeiter.objects.all()
    serializer_class = MitarbeiterAPIserializer
    permission_classes = [IsAuthenticated]

