import React, { useEffect, useState } from 'react';

const CheesecakePage = () => {
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlavors = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/deserts/?type=cheesecake'); // Предположим, что у тебя есть фильтрация по типу
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlavors(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlavors();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <div>
            <h2>Вкусы чизкейков</h2>
            <ul>
                {flavors.map(flavor => (
                    <li key={flavor.id}>
                        <h3>{flavor.name}</h3>
                        <p>{flavor.description}</p>
                        <p>Цена: {flavor.price} руб.</p>
                        {flavor.image && <img src={flavor.image} alt={flavor.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheesecakePage;
