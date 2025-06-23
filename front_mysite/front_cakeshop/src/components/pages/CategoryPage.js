import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartIcon from './../CartIcon';
import Navbar from "../Navbar";


const CategoryPage = () => {
    const {addToCart} = useContext(CartContext);
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
             <Navbar />
            <h2>{category}</h2>
             <CartIcon />
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
                            <button className="add-to-cart-btn" onClick={() => addToCart(d, quantity)}>Добавить в корзину</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default CategoryPage;