import React from 'react';
import { Link } from 'react-router-dom';
import './DessertCategories.css';


const DessertCategories = () => {
    const categories = [
        { name: 'Чизкейки', image: '/images/cheesecake.jpg', path: '/cheesecake' },
        { name: 'Моти', image: '/images/mothi.jpg', path: '/mochi' },
        { name: 'Макарунс', image: '/images/makaruns.jpg', path: '/macaron' },
        { name: 'Пирожное', image: '/images/kartoshka.jpg', path: '/pastry' },
        { name: 'Торты', image: '/images/tort.jpg', path: '/cake' },
    ];

    return (
        <div className="dessert-categories">
            {categories.map((category, index) => (
                <Link to={category.path} key={index} className="dessert-category">
                    <img src={category.image} alt={category.name} />
                    <h3>{category.name}</h3>
                </Link>
            ))}
        </div>
    );
};

export default DessertCategories;