from django.urls import path 
from .views import ProduktkatalogAPIView, ProduktkatalogDetailAPIView, fetchArtikel

urlpatterns = [
    path("",ProduktkatalogAPIView.as_view(), name="Produktkatalog"),
    path ("<int:pk>", ProduktkatalogDetailAPIView.as_view(),name="KatalogDetail"),
    path ("create", ProduktkatalogAPIView.as_view(), name="create"),
    path ("fetchArtikel", fetchArtikel, name="fetchArtikel"),
    ]

