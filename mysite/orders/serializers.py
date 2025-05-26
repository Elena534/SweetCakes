from rest_framework import serializers
from .models import Order, OrderItem
from cakeshop.models import Dessert

class OrderItemSerializer(serializers.ModelSerializer):
    dessert_name = serializers.CharField(source='dessert.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'dessert', 'dessert_name', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'total_price', 'is_paid', 'items']