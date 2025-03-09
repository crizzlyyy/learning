from django.shortcuts import render
from .models import Bilanzdaten
from rest_framework import generics
from .serializers import BilanzdatenAPIserializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class BilanzdatenAPIView(generics.ListCreateAPIView):

    queryset = Bilanzdaten.objects.all()
    serializer_class = BilanzdatenAPIserializer
    permission_classes = [IsAuthenticated]