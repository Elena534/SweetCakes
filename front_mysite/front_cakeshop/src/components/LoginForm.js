import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // подключим стили (ниже)

const LoginModal = ({ isOpen, onClose, onLoginSuccess  }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null; // если модалка закрыта — ничего не рендерим

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post('http://localhost:8000/auth/login/', formData);

      const accessToken = loginResponse.data.access;
      const refreshToken = loginResponse.data.refresh;

      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      const userResponse = await axios.get('http://localhost:8000/api/users/me/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const { username, is_staff } = userResponse.data;

      localStorage.setItem('username', username);
      localStorage.setItem('is_admin', is_staff);

      setMessage(`✅ Добро пожаловать, ${username}!`);

      if (onLoginSuccess) {
        onLoginSuccess(username, is_staff);  // <-- Важно!
      }

      onClose(); // закрываем модалку

      navigate(is_staff ? '/admin' : '/');
    } catch (error) {
      console.error('Ошибка логина:', error.response?.data || error.message);
      setMessage('❌ Ошибка входа: ' + (error.response?.data?.detail || 'Проверьте логин и пароль'));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">Войти</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginModal;