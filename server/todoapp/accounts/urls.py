from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, LogoutView

urlpatterns = [
    path("login/", LoginView.as_view()) ,
    path("login/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterView.as_view()),
    path("logout/", LogoutView.as_view())
]

# https://www.youtube.com/watch?v=AcYF18oGn6Y
# https://stackoverflow.com/questions/66247988/how-to-store-jwt-tokens-in-httponly-cookies-with-drf-djangorestframework-simplej