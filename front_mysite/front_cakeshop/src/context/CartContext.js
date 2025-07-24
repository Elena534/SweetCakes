import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Загружаем корзину с сервера
  const loadCartFromServer = useCallback(async () => {
    const token = localStorage.getItem('access');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:8000/api/orders/cart/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const items = response.data.items || [];
      setCartItems(items);

      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(total);
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
    }
  }, []);

  // Функция обновления (вызывается после добавления/удаления товара)
  const refreshCart = () => {
    setRefreshFlag(prev => !prev);
  };

  useEffect(() => {
    loadCartFromServer();
  }, [loadCartFromServer, refreshFlag]);

  return (
    <CartContext.Provider value={{
      cartItems,
      totalItems,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};