from .views import BestellungenAPIView, BestellungenDetailAPIView, Dashboard
from django.urls import path


urlpatterns = [
    path("", BestellungenAPIView.as_view(), name="Bestellungen"),
    path ("<int:pk>", BestellungenDetailAPIView.as_view(),name="LagerDetail"),
    path ("create", BestellungenAPIView.as_view(), name="create"),
    path('dashboard/', Dashboard, name='dashboard')
    
]