from django.conf import settings
from django.contrib.auth import authenticate
from django.middleware import csrf
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from .serializers import UserSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# It is best to make logging in a wrapper around TokenObtainPairView, however this method also works
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response(
                {"detail": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"detail": "This account is not active."},
                status=status.HTTP_403_FORBIDDEN,
            )

        tokens = get_tokens_for_user(user)

        response = Response(
            {"detail": "Login successful", "access": tokens["access"]},
            status=status.HTTP_200_OK,
        )

        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=tokens["refresh"],
            max_age=int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()),
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        csrf.get_token(request)
        return response

# It is best to make logging in a wrapper around TokenRefreshView, however this method also works
class CookieTokenRefreshView(APIView):
    def post(self, request):
        cookie_name = settings.SIMPLE_JWT["AUTH_COOKIE"]
        refresh_token = request.COOKIES.get(cookie_name)

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)

        except TokenError as e:
            raise InvalidToken(e.args[0])

        data = serializer.validated_data

        # Only include the access token in the response as the refresh token is in the HTTP-Only cookie
        response = Response({"access": data["access"]}, status=status.HTTP_200_OK)

        new_refresh = data.get("refresh")
        
        if new_refresh:
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=refresh_token,
                max_age=int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()),
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

        return response

class LogoutView(APIView):
    def post(self, request):
        cookie_name = settings.SIMPLE_JWT["AUTH_COOKIE"]
        refresh_token = request.COOKIES.get(cookie_name)

        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass

        response = Response(
            {"detail": "Logout successful"}, status=status.HTTP_200_OK
        )
        response.delete_cookie(
            cookie_name,
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        return response