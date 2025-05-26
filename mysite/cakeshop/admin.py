from django.contrib import admin
from .models import Dessert

class DessertAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name',)

admin.site.register(Dessert, DessertAdmin)  # Регистрация модели в админке
