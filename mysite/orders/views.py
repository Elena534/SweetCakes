from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .models import Order, OrderItem
from cakeshop.models import Dessert
from decimal import Decimal
from rest_framework import viewsets, permissions
from .models import Order
from .serializers import OrderSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

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

