import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrdersPanel.css';

const AdminOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortField, setSortField] = useState('');
  const [statusFilter, setStatusFilter] = useState('');


  useEffect(() => {
    const fetchAdminOrders = async () => {
      const token = localStorage.getItem('access');
      try {
        const response = await axios.get('http://localhost:8000/api/orders/admin/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке заказов администратора:', error);
      }
    };

    fetchAdminOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот заказ?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://localhost:8000/api/orders/admin/orders/${orderId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
    }
  };


  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('access');
    try {
      await axios.patch(`http://localhost:8000/api/orders/admin/orders/${orderId}/`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Обновляем локально статус
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
       console.error('Ошибка при изменении статуса заказа:', error.response?.data || error.message);;
    }
  };

const filteredOrders = orders
  .filter(order => {
    // Защита от отсутствия user_info
    const { username = '', email = '', phone = '' } = order;

    const fullText = `${username} ${email} ${phone}`.toLowerCase();
    const matchesSearch = fullText.includes(searchTerm.toLowerCase());

    const orderDate = new Date(order.delivery_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  })
  .sort((a, b) => {
    if (sortField === 'date') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortField === 'price') {
      return b.total_price - a.total_price;
    }
    return 0;
  });

  return (
      <div className="admin-orders-container">
        <h2>Админка: все заказы</h2>
        <div className="admin-filters">
          <input
              type="text"
              placeholder="Поиск по имени, email, телефону"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="От"
          />
          <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="До"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Все статусы</option>
            <option value="new">Новый</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Выполнен</option>
          </select>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="">Сортировка</option>
            <option value="date">По дате</option>
            <option value="price">По сумме</option>
          </select>
        </div>
        {orders.length === 0 ? (
            <p>Нет заказов</p>
        ) : (
            filteredOrders.map(order => (
                <div key={order.id} className="admin-order-card">
                  <p><strong>Пользователь:</strong> {order.username}, {order.email}, {order.phone}</p>
                  <p><strong>Дата создания:</strong> {new Date(order.created_at).toLocaleString()}</p>
                  <p><strong>Срок исполнения:</strong> {order.delivery_date}</p>
                  <p><strong>Сумма:</strong> {order.total_price} BYN</p>
                  <p>
                    <strong>Статус:</strong>
                    <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                        className={`status-select status-${order.status}`}
                    >
                      <option value="new">новый</option>
                      <option value="in_progress">в работе</option>
                      <option value="completed">выполнен</option>
                    </select>
                  </p>
                  <ul>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <li key={index}>
                              {item.dessert_name} — {item.quantity} шт. по {item.price} BYN
                            </li>
                        ))
                    ) : (
                        <li>Нет данных о товарах</li>
                    )}
                    <button
                        className="delete-order-button"
                        onClick={() => handleDeleteOrder(order.id)}
                    >
                      Удалить заказ
                    </button>
                  </ul>
                </div>
            ))
        )}
      </div>
  );
};

export default AdminOrdersPanel;