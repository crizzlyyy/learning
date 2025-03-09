from rest_framework import serializers
from .models import Produktkatalog

class ProduktkatalogAPIserializer(serializers.ModelSerializer):
    class Meta:
        model = Produktkatalog
        fields = "__all__"