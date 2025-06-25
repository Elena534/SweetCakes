import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

// import { CartContext } from '../../context/CartContext';
import CartIcon from './../CartIcon';
import Navbar from "../Navbar";


const CategoryPage = () => {
    const categoryDescriptions = {
        macaron: "Макарон, макароны, макаронс - как только их не называют. Это известные французские пирожные. Крышечки из теста на миндальной муке которые соединяют различными ганашами. Безумно вкусные, яркие и необычные пирожные, которые пользуются популярностью и имеют неповторимый вкус.",
        cupcakes: "Капкейки — маленькие радости с разнообразными начинками и оформлением.",
        eclairs: "Эклеры с нежным заварным кремом и хрустящей глазурью — классика французской кондитерской.",
    };

    const {category} = useParams();
    const [desserts, setDesserts] = useState([]);
    // const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const increase = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    };
    const decrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    };

   const handleAddToCart = async (dessert, quantity) => {
      const token = localStorage.getItem('access');
      if (!token) {
        alert('Сначала войдите в систему');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/orders/cart/add/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            dessert_id: dessert.id,
            quantity: quantity
          })
        });

        if (response.ok) {
          alert('Добавлено в корзину!');
        } else {
          const data = await response.json();
          console.error('Ошибка добавления:', data);
          alert('Ошибка при добавлении в корзину');
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Ошибка сети при добавлении');
      }
    };


    useEffect(() => {
        fetch(`http://localhost:8000/api/desserts/?category=${category}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setDesserts(data);
                } else {
                    setDesserts([]);
                }
            })
            .catch(() => {
                setDesserts([]);
            });
    }, [category]);


    return (
        <div>
            <Navbar/>
            <h2>{category}</h2>
            <p className="category-description">{categoryDescriptions[category]}</p>
            <CartIcon/>
            <div className="dessert-list">
                {desserts.map(d => {
                    const quantity = quantities[d.id] || 1;
                    return (
                        <div key={d.id} className="dessert-card">
                            <h3>{d.name}</h3>
                            <p>{d.description}</p>
                            <p className="price">
                                <span className="amount">{d.price}</span>
                                <span className="currency"> BYN</span>
                            </p>
                            <img src={d.image} alt={d.name} width="200"/>
                            <div className="quantity-controls">
                                <button className="quantity-btn" onClick={() => decrease(d.id)}>−</button>
                                <span>{quantity}</span>
                                <button className="quantity-btn" onClick={() => increase(d.id)}>+</button>
                            </div>
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(d, quantity)}>Добавить в
                                корзину
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default CategoryPage;