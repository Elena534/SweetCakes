import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() =>{
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

    const addToCart = (item, quantity = 1) => {
    setCartItems(prev => {
        const exists = prev.find(i => i.id === item.id);
        if (exists) {
            return prev.map(i =>
                i.id === item.id
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
            );
        }
        return [...prev, { ...item, quantity }];
    });
};

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const increaseQuantity = (id) => {
        setCartItems(prev =>
        prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prev =>
        prev
            .map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
     );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity,
      decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};