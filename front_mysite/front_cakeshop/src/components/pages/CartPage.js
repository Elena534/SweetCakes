import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const { refreshCart } = useContext(CartContext);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/orders/cart/');
      console.log('Ответ корзины:', response.data)
      setCartItems(response.data.items);
    } catch (err) {
      console.error('Ошибка при получении корзины:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCart = () => fetchCart();

  const increaseQuantity = async (dessertId) => {
    await axios.post('/orders/cart/add/', { dessert_id: dessertId, quantity: 1 });
    updateCart();
    refreshCart()
  };

  const decreaseQuantity = async (dessertId) => {
    const item = cartItems.find((i) => i.dessert.id === dessertId);
    if (item.quantity <= 1) {
      await removeFromCart(dessertId);
    } else {
      await axios.post('/orders/cart/add/', { dessert_id: dessertId, quantity: -1 });
      updateCart();
    }
  };

  const removeFromCart = async (dessertId) => {
    try {
      await axios.post('/orders/cart/remove/', { dessert_id: dessertId });
      updateCart()// <--- обновляем корзину и счётчик
    } catch (error) {
      console.error('Ошибка при удалении из корзины', error);
    }};


  const clearCart = async () => {
    await axios.post('/orders/cart/clear/');
    updateCart();
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('orders/create/', {
        items: cartItems.map(item => ({
          dessert: item.dessert.id,
          quantity: item.quantity
        })),
        delivery_date: deliveryDate
      });

      if (response.status === 201) {
        clearCart();
        alert('Заказ успешно оформлен!');
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Не удалось оформить заказ');
    }
  };

  const total = Array.isArray(cartItems)
  ? cartItems.reduce((acc, item) => acc + item.dessert.price * item.quantity, 0)
  : 0;

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста 🍰</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={`http://localhost:8000${item.dessert.image}`} alt={item.dessert.name} />
                <div>
                  <h4>{item.dessert.name}</h4>
                  <p>Количество:
                    <button onClick={() => decreaseQuantity(item.dessert.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.dessert.id)}>+</button>
                  </p>
                  <p>Цена: {(item.dessert.price * item.quantity).toFixed(2)} BYN</p>
                  <button onClick={() => removeFromCart(item.dessert.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="delivery-date">
            <label>Дата исполнения заказа:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>

          <div className="cart-summary">
            <h3>Итого: {total.toFixed(2)} BYN</h3>
            <button onClick={clearCart}>Очистить корзину</button>
            <button onClick={handleCheckout}>Оформить заказ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
