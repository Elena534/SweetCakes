from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Desert
from .serializers import DesertSerializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend


class DesertViewSet(viewsets.ModelViewSet):
    queryset = Desert.objects.all()  # Получаем все объекты Product
    serializer_class = DesertSerializer # Указываем сериализатор
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

class DesertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Desert.objects.all()
    serializer_class = DesertSerializer
