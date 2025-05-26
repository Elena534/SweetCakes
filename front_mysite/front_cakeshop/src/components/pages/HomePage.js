import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import DessertCategories from '../DessertCategories';
import CartIcon from './../CartIcon';
import RegisterModal from '../RegisterModal';

const HomePage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const registerModalRef = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const openRegisterModal = () => {
    setShowRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    setUsername('');
    window.location.reload(); // обновим страницу
  };

  useEffect(() => {
    if (showRegister && registerModalRef.current) {
      registerModalRef.current.resetForm();
    }
  }, [showRegister]);

  return (
    <div className="home-container">
      <header className="header">
        <div className="quit">
          {username ? (
            <>
              <span className="header-text">👤{username} </span>
              <button onClick={handleLogout} className="header-btn">Выйти</button>
              <Link to="/profile" className="header-link profile-link">Личный кабинет</Link>
            </>
          ) : (
            <>
          <Link to="/login" className="header-link">Вход </Link>
          <button onClick={openRegisterModal} className="header-btn">Регистрация</button>
            </>
          )}
        </div>
        <div className="cart-icon">
          <Link to="/cart" className="header-link" >
            <CartIcon />
          </Link>
        </div>
        <h1>SweetCakes.by</h1>
        <nav>
          <ul>
            <li><Link to="/">Главная </Link></li>
            <li><Link to="/products">Товары</Link></li>
            <li><Link to="/about">О нас</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Наши шедевры для вас</h2>
        <DessertCategories />
      </main>
      <footer>
        <p>&copy; 2025 SweetCakes</p>
      </footer>

      {/*{showRegister && (*/}
        <RegisterModal
          ref={registerModalRef}
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
        />

    </div>
  );
};

export default HomePage;

