from rest_framework import serializers
from .models import Order, OrderItem, CartItem, Cart
from cakeshop.models import Dessert
from users.models import CustomUser



class DessertShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dessert
        fields = ['id', 'name', 'price', 'image']

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'phone', 'email']

class OrderItemSerializer(serializers.ModelSerializer):
    dessert_name = serializers.CharField(source='dessert.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'dessert', 'dessert_name', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer( many=True, read_only=True)

    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'username', 'email', 'phone', 'created_at', 'delivery_date', 'status', 'total_price', 'is_paid', 'items']


class CartItemSerializer(serializers.ModelSerializer):
    dessert = DessertShortSerializer(read_only=True)
    dessert_id = serializers.PrimaryKeyRelatedField(queryset=Dessert.objects.all(), source='dessert', write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'dessert', 'dessert_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']
        read_only_fields = ['user']