from django.urls import path

from .views import get_all_testimonials

urlpatterns = [
    path("", get_all_testimonials),
]