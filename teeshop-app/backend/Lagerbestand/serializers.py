from rest_framework import serializers
from .models import Lagerbestand

class LagerbestandAPIserializer(serializers.ModelSerializer):
    class Meta:
        model = Lagerbestand
        fields = "__all__"