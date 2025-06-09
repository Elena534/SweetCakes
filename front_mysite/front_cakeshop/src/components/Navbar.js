import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('with-navbar');
    return () => document.body.classList.remove('with-navbar');
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const adminFlag = localStorage.getItem('is_admin') === 'true';
    setUsername(storedUsername);
    setIsAdmin(adminFlag);
  }, []);

  const handleProfileClick = () => {
    if (isAdmin) {
      navigate('/profile'); // админка
    } else {
      navigate('/user'); // личный кабинет пользователя
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SweetCakes.by</Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/products">Товары</Link></li>
          {!username ? (
            <li><Link to="/login">Вход</Link></li>
          ) : (
            <li onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              {username}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;