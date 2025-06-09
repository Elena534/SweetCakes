from django.contrib import admin
from .models import Order, OrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'delivery_date', 'status', 'created_at')
    list_filter = ('status', 'delivery_date')
    search_fields = ('user__username',)
    ordering = ('-created_at',)

admin.site.register(OrderItem)

# Register your models here.
