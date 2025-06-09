import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDessertPanel.css';

const AdminDessertsPanel = () => {
  const [desserts, setDesserts] = useState([]);
  const [editingDessert, setEditingDessert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
  });

  const token = localStorage.getItem('access');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  useEffect(() => {
    fetchDesserts();
  }, []);


  const fetchDesserts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/desserts/', { headers });
      setDesserts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке десертов:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (dessert) => {
    setEditingDessert(dessert.id);
    setFormData({
      name: dessert.name,
      description: dessert.description,
      price: dessert.price,
      image: null,
      category: dessert.category,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить десерт?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/desserts/${id}/`, { headers });
      fetchDesserts();
    } catch (error) {
      console.error('Ошибка при удалении десерта:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }
    try {
      if (editingDessert) {
        await axios.put(`http://localhost:8000/api/desserts/${editingDessert}/`, data, { headers });
      } else {
        await axios.post('http://localhost:8000/api/desserts/', data, { headers });
      }
      setEditingDessert(null);
      setFormData({ name: '', description: '', price: '', image: null, category: '' });
      fetchDesserts();
    } catch (error) {
      console.error('Ошибка при сохранении десерта:', error);
    }
  };

  return (
    <div className="admin-desserts-container">
      <h2>Админка: управление десертами</h2>
      <form className="dessert-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Название" required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Описание" required />
        <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Цена" type="number" step="0.01" required />
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Категория</option>
          <option value="cheesecake">Чизкейк</option>
          <option value="mochi">Моти</option>
          <option value="macaron">Макарунс</option>
          <option value="pastry">Пирожное</option>
          <option value="cake">Торт</option>
        </select>
        <input type="file" name="image" onChange={handleInputChange} accept="image/*" />
        <button type="submit">{editingDessert ? 'Сохранить' : 'Добавить'}</button>
      </form>

      <div className="dessert-list">
        {desserts.map(dessert => (
          <div key={dessert.id} className="dessert-card">
            <img src={dessert.image} alt={dessert.name} className="dessert-image" />
            <p><strong>{dessert.name}</strong> ({dessert.category})</p>
            <p>{dessert.price} BYN</p>
            <p>{dessert.description}</p>
            <button onClick={() => handleEdit(dessert)}>Редактировать</button>
            <button onClick={() => handleDelete(dessert.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDessertsPanel;
