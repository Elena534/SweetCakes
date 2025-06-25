import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
      try {
        const loginResponse = await axios.post('http://localhost:8000/auth/login/', {
          username: formData.username,
          password: formData.password
        });

      const accessToken = loginResponse.data.access;
      const refreshToken = loginResponse.data.refresh;

      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      const userResponse = await axios.get('http://localhost:8000/api/users/me/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

      const { username, is_staff } = userResponse.data;

       localStorage.setItem('username', userResponse.data.username);
       localStorage.setItem('is_admin', userResponse.data.is_staff);

       setMessage(`✅ Добро пожаловать, ${username}!`);

       if (is_staff) {
         navigate('/admin-panel'); // админка
        } else {
          navigate('/profile'); // личный кабинет
        }

       // navigate('/');
    } catch (error) {
      console.error('Ошибка логина:', error.response?.data || error.message);
      setMessage('❌ Ошибка входа: ' + (error.response?.data?.detail || 'Проверьте логин и пароль'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="text" name="username" placeholder="Имя пользователя" onChange={handleChange} />
      <input type="password" name="password" placeholder="Пароль" onChange={handleChange} />
      <button type="submit">Войти</button>
      <p>{message}</p>
    </form>
  );
};

export default LoginForm;
