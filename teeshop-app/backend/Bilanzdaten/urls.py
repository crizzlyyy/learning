from django.urls import path
from .views import BilanzdatenAPIView

urlpatterns = [
    path("", BilanzdatenAPIView.as_view(), name="Bilanzdaten")
]