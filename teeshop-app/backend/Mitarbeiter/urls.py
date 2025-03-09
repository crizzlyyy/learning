from django.urls import path
from .views import MitarbeiterAPIView, MitarbeiterDetailAPIView

urlpatterns = [
    path("", MitarbeiterAPIView.as_view(), name="Mitarbeiter"),
    path ("<int:pk>", MitarbeiterDetailAPIView.as_view(),name="MitarbeiterDetail"),
    path ("create", MitarbeiterAPIView.as_view(), name="create")
]
