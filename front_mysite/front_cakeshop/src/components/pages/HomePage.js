import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import DessertCategories from '../DessertCategories';
import { useContext } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
import {CartContext} from "../../context/CartContext";
import CartIcon from './../CartIcon';

const HomePage = () => {
    const { cartItems } = useContext(CartContext);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div className="home-container">
            <header className="header">
            <div className="cart-icon">
            <Link to="/cart">
                <CartIcon />
                {/*{totalItems > 0 && <span className="cart-count">{totalItems}</span>}*/}
            </Link>
            </div>
                <h1>SweetCakes.by</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/products">Товары</Link></li>
                        <li><Link to="/about">О нас</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2>Наши шедевры для вас</h2>
                <DessertCategories/>
            </main>
            <footer>
                <p>&copy; 2025 SweetCakes</p>
            </footer>
        </div>

    );
};

export default HomePage;

