from django.urls import path, include
from .views import UserRegisterView, CustomTokenObtainPairView, CustomTokenRefreshView
from .views import user_profile

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/', user_profile, name='user-profile'),
    path('me/', user_profile, name='user-profile'),
]