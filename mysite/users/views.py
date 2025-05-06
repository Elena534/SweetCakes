from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomUserSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    pass  # Можно добавить кастомизацию позже

class CustomTokenRefreshView(TokenRefreshView):
    pass

# Create your views here.
