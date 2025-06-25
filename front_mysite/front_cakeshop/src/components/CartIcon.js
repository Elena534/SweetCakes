// import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
import './CartIcon.css';
import React, { useEffect, useState } from 'react';

const CartIcon = () => {
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('access');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8000/api/cart/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const items = data.items || [];
                    const total = items.reduce((sum, item) => sum + item.quantity, 0);
                    setTotalItems(total);
                } else {
                    console.error('Ошибка при загрузке корзины');
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="cart-icon">
            <Link to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#370"
                    viewBox="0 0 576 512"
                >
                    <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                </svg>
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
        </div>
    );
};

export default CartIcon;