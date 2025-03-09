from .models import Bilanzdaten
from rest_framework import serializers

class BilanzdatenAPIserializer(serializers.ModelSerializer):

    class Meta:

        model = Bilanzdaten
        fields = "__all__"