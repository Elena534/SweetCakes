import React from 'react';
import HomePage from './components/pages/HomePage'; // Импорт вашего компонента
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import CartPage from './components/pages/CartPage';

const App = () => {
    return (
        <Router>
          <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:category" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                {/* Добавь другие маршруты здесь */}
            </Routes>
        </Router>
    );
};

export default App;
