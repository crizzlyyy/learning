from rest_framework import serializers
from .models import Mitarbeiter

class MitarbeiterAPIserializer(serializers.ModelSerializer):
    class Meta:
        model = Mitarbeiter
        fields = "__all__"