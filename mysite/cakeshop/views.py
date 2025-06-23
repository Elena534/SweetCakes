from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Dessert
from .serializers import DessertSerializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend


class DessertViewSet(viewsets.ModelViewSet):
    queryset = Dessert.objects.all()  # Получаем все объекты Product
    serializer_class = DessertSerializer # Указываем сериализатор
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [AllowAny()]  # Разрешаем всем
        return super().get_permissions()  # Для POST, PUT, DELETE — как обычно



class DessertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dessert.objects.all()
    serializer_class = DessertSerializer
