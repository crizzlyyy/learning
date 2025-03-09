from django.urls import path
from .views import LagerbestandAPIview,LagerbestandDetailAPIView, get, protected_view

urlpatterns = [
    path ("", LagerbestandAPIview.as_view(),name="Lager"),
    path ("<int:pk>", LagerbestandDetailAPIView.as_view(),name="LagerDetail"),
    path ("create", LagerbestandAPIview.as_view(), name="create"),
    path ("minBestandSoon", get, name="minBestandSoon"),    
]
