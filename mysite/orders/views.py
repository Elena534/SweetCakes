from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .models import Order, OrderItem, Cart, CartItem
from cakeshop.models import Dessert
from decimal import Decimal
from rest_framework import viewsets, permissions
from .serializers import OrderSerializer, CartSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action

class UserOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class AdminOrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['delivery_date']
    search_fields = ['user__username', 'user__email']
    ordering_fields = ['created_at', 'total_price', 'status']


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        items = request.data.get('items', [])
        delivery_date = request.data.get('delivery_date')
        if not items:
            return Response({'error': 'Корзина пуста'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user, delivery_date=delivery_date)
        total = Decimal('0.00')

        print("Полученные items:", items)


        for item in items:
            dessert_id = item.get('dessert')
            quantity = int(item.get('quantity', 1))

            try:
                dessert = Dessert.objects.get(id=dessert_id)
                price = Decimal(dessert.price) * Decimal(quantity)
                total += price

                OrderItem.objects.create(
                    order=order,
                    dessert=dessert,
                    quantity=quantity,
                    price=price
                )
            except Dessert.DoesNotExist:
                continue

        order.total_price = total
        order.save()


        return Response({'message': 'Заказ создан успешно', 'order_id': order.id}, status=status.HTTP_201_CREATED)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_cart(self, user):
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

    def list(self, request):
        """Обрабатывает GET /cart/ — возвращает корзину пользователя"""
        cart = self.get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        cart = self.get_cart(request.user)
        dessert_id = request.data.get('dessert_id')
        quantity = int(request.data.get('quantity', 1))

        item, created = CartItem.objects.get_or_create(cart=cart, dessert_id=dessert_id)
        if not created:
            item.quantity += quantity
            item.save()

        return Response({'message': 'Добавлено в корзину'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        cart = self.get_cart(request.user)
        dessert_id = request.data.get('dessert_id')

        CartItem.objects.filter(cart=cart, dessert_id=dessert_id).delete()
        return Response({'message': 'Удалено из корзины'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='clear')
    def clear(self, request):
        user = request.user
        CartItem.objects.filter(cart__user=user).delete()
        return Response({'status': 'Корзина очищена'})