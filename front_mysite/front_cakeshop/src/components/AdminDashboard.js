import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Админка</h2>
      <p>Выберите раздел:</p>
      <div className="admin-buttons">
        <button onClick={() => navigate('/admin/orders')}>Управление заказами</button>
        <button onClick={() => navigate('/admin/desserts')}>Управление десертами</button>
      </div>
    </div>
  );
};

export default AdminDashboard;