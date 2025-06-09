from django.urls import path, include
from .views import UserRegisterView, CustomTokenObtainPairView, CustomTokenRefreshView
from .views import user_profile
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api/token/', obtain_auth_token, name='api_token_auth'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/', user_profile, name='user-profile'),
    path('me/', user_profile, name='user-profile'),
]