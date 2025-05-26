import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Импорт стилей для Navbar
// import RegisterModal from "./RegisterModal";

const Navbar = () => {
  useEffect(() => {
  document.body.classList.add('with-navbar');
  return () => document.body.classList.remove('with-navbar');
}, []);
    return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SweetCakes.by</Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/products">Товары</Link></li>
          <li><Link to="/login">Вход</Link></li>
          {/*<button onClick={openRegisterModal}>Регистрация</button>*/}
        </ul>
      </div>
    </nav>
    );
};

export default Navbar;