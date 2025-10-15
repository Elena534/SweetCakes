import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import DessertCategories from '../DessertCategories';
import CartIcon from './../CartIcon';
import RegisterModal from '../RegisterModal';
import LoginForm from '../LoginForm';

const HomePage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const registerModalRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    if (savedUsername) {
      setUsername(savedUsername);
      setIsAdmin(isAdmin);
    }
  }, []);

  const openRegisterModal = () => {
    setShowRegister(true);
  };

  const openLoginModal = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    setUsername('');
    window.location.reload(); // обновим страницу
  };

  const handleLoginSuccess = (username, isAdmin) => {
    setUsername(username);
    setIsAdmin(isAdmin);
    setShowLogin(false);
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
              <span
                className="header-text"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (isAdmin) {
                    window.location.href = '/admin';
                  } else {
                    window.location.href = '/user';
                  }
                }}
              >
                👤{username}
              </span>
              <button onClick={handleLogout} className="header-btn">Выйти</button>
            </>
          ) : (
            <>
              <button onClick={openLoginModal} className="header-btn">Вход</button>
              <button onClick={openRegisterModal} className="header-btn">Регистрация</button>
            </>
          )}
        </div>

        <div className="cart-icon">
            <CartIcon />
        </div>

        <h1>SweetCakes.by</h1>

        <nav>
          <ul>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/individualorder">Индивидуальные заказы</Link></li>
            <li><Link to="/payment">Доставка и оплата</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Наши шедевры для вас</h2>
        <DessertCategories/>
      </main>
      <footer>
        <p> Время работы: ежедневно с8.00 до 20.00 📞 +375(29)581-76-82  📧 sweets@confectionery.ru</p>
      </footer>

      {/*{showRegister && (*/}
      <RegisterModal
          ref={registerModalRef}
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
      />

        <LoginForm
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
};

export default HomePage;

