from django.urls import path, include
from .views import DesertViewSet
from .views import DesertDetail
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'deserts', DesertViewSet, basename='deserts')


urlpatterns = [
    path('', include(router.urls)),# Включаем маршруты из маршрутизатора
    path('deserts/<int:pk>/', DesertDetail.as_view(), name='desert-detail'),

]