from .models import Bestellungen
from rest_framework import serializers

class BestellungenAPIserializer(serializers.ModelSerializer):
    class Meta:
        model = Bestellungen
        fields = "__all__"