from django.contrib import admin

# Register your models here.
from .models import Desert  # Импортируйте вашу модель

admin.site.register(Desert)  # Регистрация модели в админке