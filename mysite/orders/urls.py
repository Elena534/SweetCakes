from django.urls import path
from .views import CreateOrderView, UserOrdersView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('my/', UserOrdersView.as_view(), name='user_orders'),
]