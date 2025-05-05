import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity} = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;