import React from 'react';
import HomePage from './components/pages/HomePage'; // Импорт вашего компонента
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import CartPage from './components/pages/CartPage';
import LoginForm from './components/LoginForm';
import UserProfile from './components/pages/UserProfile'
import RegisterModal from "./components/RegisterModal";



const App = () => {
    return (
        <Router>
            {/*<Navbar />*/}
          <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:category" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterModal />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
