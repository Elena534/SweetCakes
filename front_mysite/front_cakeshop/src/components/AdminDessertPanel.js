import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import './AdminDessertPanel.css';

const AdminDessertsPanel = () => {
  const modalRef = useRef(null);
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
  const headers = useMemo(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchDesserts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cakes/desserts/', {headers});
      setDesserts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке десертов:', error);
    }
  }, [headers]);

  useEffect(() => {
    fetchDesserts();
  }, [fetchDesserts]);

  const handleInputChange = (e) => {
    const {name, value, files} = e.target;
    if (files) {
      setFormData((prev) => ({...prev, [name]: files[0]}));
    } else {
      setFormData((prev) => ({...prev, [name]: value}));
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
    setTimeout(() => {
      if (modalRef.current) {
        const yOffset = -100;
        const y = modalRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить десерт?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/cakes/desserts/${id}/`, {headers});
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
        await axios.put(`http://localhost:8000/api/cakes/desserts/${editingDessert}/`, data, {headers});
      } else {
        await axios.post('http://localhost:8000/api/cakes/desserts/', data, {headers});
      }
      setEditingDessert(null);
      setFormData({name: '', description: '', price: '', image: null, category: ''});
      fetchDesserts();
    } catch (error) {
      console.error('Ошибка при сохранении десерта:', error.response?.data || error);
    }
  };

  const categoryRefs = useRef({});

  const scrollToCategory = (category) => {
    const element = categoryRefs.current[category];
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const getCategoryTitle = (key) => {
    const titles = {
      cheesecake: 'Чизкейки',
      mochi: 'Моти',
      macaron: 'Макарунсы',
      pastry: 'Пирожные',
      cake: 'Торты',
    };
    return titles[key] || key;
  };

  return (
      <div className="admin-desserts-container">
        <h2>Админка: управление десертами</h2>
        <div className="category-nav">
          {['cheesecake', 'mochi', 'macaron', 'pastry', 'cake'].map((cat) => (
              <button key={cat} onClick={() => scrollToCategory(cat)} className="category-link">
                {getCategoryTitle(cat)}
              </button>
          ))}
        </div>
        <form className="dessert-form" onSubmit={handleSubmit} ref={modalRef}>
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Название" required/>
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Описание"
                    required/>
          <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Цена" type="number"
                 step="0.01" required/>
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="">Категория</option>
            <option value="cheesecake">Чизкейк</option>
            <option value="mochi">Моти</option>
            <option value="macaron">Макарунс</option>
            <option value="pastry">Пирожное</option>
            <option value="cake">Торт</option>
          </select>
          <input type="file" name="image" onChange={handleInputChange} accept="image/*"/>
          <button type="submit">{editingDessert ? 'Сохранить' : 'Добавить'}</button>
        </form>

        <div className="category-list">
          {['cheesecake', 'mochi', 'macaron', 'pastry', 'cake'].map((cat, index) => {
            const filtered = desserts.filter((d) => d.category === cat);
            if (filtered.length === 0) return null;

            return (
                <div className="category-block"
                     key={cat}
                     ref={(el)=> (categoryRefs.current[cat] = el)}
                     style={{ marginLeft: `${index * 40}px`, marginTop: `${index * 40}px` }}
                >
                  <h3>{getCategoryTitle(cat)}</h3>
                  <div className="dessert-list">
                    {filtered.map((dessert) => (
                        <div key={dessert.id} className="dessert-card">
                          <img src={dessert.image} alt={dessert.name} className="dessert-image"/>
                          <p><strong>{dessert.name}</strong></p>
                          <p>{dessert.price} BYN</p>
                          <p>{dessert.description}</p>
                          <button onClick={() => handleEdit(dessert)}>Редактировать</button>
                          <button onClick={() => handleDelete(dessert.id)}>Удалить</button>
                        </div>
                    ))}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}
export default AdminDessertsPanel;
