from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.middleware import csrf

from .serializers import UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        valid = serializer.is_valid()

        if valid:
            user = serializer.save()

            return Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
        
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(APIView):
    def post(self, request):
        data = request.data
        response = Response()

        username = data.get("username", None)
        password = data.get("password", None)
        # Email not needed

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"Invalid" : "Invalid username or password!!"},status=status.HTTP_404_NOT_FOUND)

        if user.is_active is None:
            return Response({"No active" : "This account is not active!!"},status=status.HTTP_404_NOT_FOUND)

        response_data = get_tokens_for_user(user)

        response.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
            value = response_data["refresh"],
            expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        csrf.get_token(request)
        response.data = {"Success" : "Login successfully","data": response_data}
        
        return response

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        token = RefreshToken(refresh_token)

        token.blacklist()

        return Response({"Logout sucessful"})