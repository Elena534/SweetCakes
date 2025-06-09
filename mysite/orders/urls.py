from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateOrderView, UserOrdersView, AdminOrderViewSet


router = DefaultRouter()
router.register(r'admin/orders', AdminOrderViewSet, basename='admin-orders')

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('my/', UserOrdersView.as_view(), name='user_orders'),
    path('', include(router.urls)),
]