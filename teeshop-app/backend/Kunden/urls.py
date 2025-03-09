from django.urls import path
from .views import KundenAPIView, KundenDetailAPIView, get_kundennummern

urlpatterns = [

    path("", KundenAPIView.as_view(), name="blub"),
    path ("<int:pk>", KundenDetailAPIView.as_view(),name="LagerDetail"),
    path ("create", KundenAPIView.as_view(), name="create"),
    path('getKundennummern', get_kundennummern, name='get_kundennummern'),
]