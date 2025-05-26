from django.urls import path, include
from .views import DessertViewSet
from .views import DessertDetail
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'deserts', DessertViewSet, basename='deserts')


urlpatterns = [
    path('', include(router.urls)),# Включаем маршруты из маршрутизатора
    path('desserts/<int:pk>/', DessertDetail.as_view(), name='dessert-detail'),

]