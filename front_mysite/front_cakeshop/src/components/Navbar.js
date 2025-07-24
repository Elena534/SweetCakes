import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ openLoginModal }) => {
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

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      fetch('http://localhost:8000/api/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            localStorage.clear();
            setUsername(null);
            setIsAdmin(false);
          }
        })
        .catch(err => {
          console.error('Ошибка при проверке токена:', err);
          localStorage.clear();
          setUsername(null);
          setIsAdmin(false);
        });
    }
  }, []);

  const handleProfileClick = () => {
    if (isAdmin) {
      navigate('/profile');
    } else {
      navigate('/user');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SweetCakes.by</Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/">Главная</Link></li>
          {username ? (
            <>
              <li onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                👤<span className="username">{username}</span>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>Выйти</button>
              </li>
            </>
          ) : (
            <li>
              <button className="login-button" onClick={openLoginModal}>Вход</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
