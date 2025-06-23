import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import './RegisterModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterModal = forwardRef(({ isOpen, onClose }, ref) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: ''
      });
      setMessage('');
    }
  }));

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: ''
      });
      setMessage('');
    }
  }, [isOpen]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validPhone = /^\+375\s?\((25|29|33|44)\)\s?\d{3}-\d{2}-\d{2}$/;
    if (!validPhone.test(formData.phone)) {
      setMessage('Телефон должен быть в формате: +375 (25|29|33|44) 123-45-67');
      return;
    }
    try {
      await axios.post('http://localhost:8000/auth/register/', {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setMessage('Успешная регистрация!');
      setTimeout(() => {
        onClose();
        navigate('/');
      }, 1500);
    } catch (error) {
        if (error.response && error.response.data.username) {
          setMessage('Имя пользователя уже занято');
        } else {
          setMessage('Ошибка регистрации');
        }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="username" placeholder="Введите ваше имя" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {/*<input type="text" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />*/}
          <input
            type="tel"
            name="phone"
            placeholder="+375 (__) ___-__-__"
            value={formData.phone}
            onChange={(e) => {
            const input = e.target.value;
            const numbers = input.replace(/\D/g, '');
            let formatted = '+375 (';
                if (numbers.length > 3) {
                  formatted += numbers.slice(3, 5) + ') ';
                  formatted += numbers.slice(5, 8) + '-' + numbers.slice(8, 10) + '-' + numbers.slice(10, 12);}
                else if (numbers.length > 0) {
                  formatted += numbers.slice(3);}

            setFormData({ ...formData, phone: formatted });
          }}
            required
          />
          <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
          <button type="submit">Зарегистрироваться</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
});

export default RegisterModal;
