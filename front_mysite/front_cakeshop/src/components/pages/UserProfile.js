import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('access');
    // console.log('Токен:', token);

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log('Ответ от сервера:', response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders/my/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
      }
    };

    fetchUserData();
    fetchOrders();
  }, []);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    try {
      await axios.patch('http://localhost:8000/auth/me/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Данные успешно обновлены!');
    } catch (error) {
      alert('Ошибка при обновлении данных');
      console.error(error);
    }
  };

  return (
      <div className="user-profile-container">
        <div className="profile-section">
          <h2>Мой профиль</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Имя:
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </label>
            <label>
              Телефон:
              <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
              />
            </label>
            <button type="submit">Сохранить</button>
          </form>
        </div>

        <div className="orders-section">
          <h2>Мои заказы</h2>
          {orders.length === 0 ? (
              <p>Нет заказов</p>
          ) : (
              orders.map(order => (
                  <div key={order.id} className="order-card">
                    <p><strong>Дата:</strong> {new Date(order.created_at).toLocaleString()}</p>
                    <p><strong>Сумма:</strong> {order.total_price} BYN</p>
                    <p><strong>Оплачен:</strong> {order.is_paid ? 'Да' : 'Нет'}</p>
                    <ul>
                      {Array.isArray(order.items) ? (
                          order.items.map((item, index) => (
                              <li key={index}>
                                {item.dessert_name} — {item.quantity} шт. по {item.price} BYN
                              </li>
                          ))
                      ) : (
                          <li>Нет данных о товарах</li>
                      )}
                    </ul>
                  </div>
              ))
          )}
        </div>
      </div>
  );
}

export default UserProfile;
