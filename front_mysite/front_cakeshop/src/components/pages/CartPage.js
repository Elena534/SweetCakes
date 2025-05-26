import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity} = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

   const handleCheckout = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('Пожалуйста, войдите в систему, чтобы оформить заказ.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            dessert: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      if (response.ok) {
        clearCart();
        alert('Заказ успешно оформлен!');
        navigate('/profile');
      } else {
        const errorData = await response.json();
        console.error('Ошибка при оформлении заказа:', errorData);
        alert('Ошибка при оформлении заказа');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Ошибка сети при оформлении заказа');
    }
  };


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
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Количество:
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </p>
                  <p>Цена: {(item.price * item.quantity).toFixed(2)} BYN</p>
                  <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
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