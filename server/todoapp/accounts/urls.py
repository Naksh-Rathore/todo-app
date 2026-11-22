from django.urls import path

from .views import RegisterView, LoginView, CookieTokenRefreshView, LogoutView, UserInformationView

urlpatterns = [
    path("login/", LoginView.as_view()) ,
    path("login/refresh/", CookieTokenRefreshView.as_view()),
    path("register/", RegisterView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("user/", UserInformationView.as_view())
]

# https://www.youtube.com/watch?v=AcYF18oGn6Y
# https://stackoverflow.com/questions/66247988/how-to-store-jwt-tokens-in-httponly-cookies-with-drf-djangorestframework-simplej