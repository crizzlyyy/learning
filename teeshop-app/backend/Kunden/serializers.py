from .models import Kunden
from rest_framework import serializers

class KundenAPIserializer(serializers.ModelSerializer):

    class Meta:

        model = Kunden
        fields = "__all__"