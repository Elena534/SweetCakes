import React from 'react';
import HomePage from './components/pages/HomePage'; // Импорт вашего компонента
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import CartPage from './components/pages/CartPage';
import LoginForm from './components/LoginForm';
import UserProfile from './components/pages/UserProfile'
import RegisterModal from "./components/RegisterModal";
import AdminOrdersPanel from './components/AdminOrdersPanel';
import Navbar from "./components/Navbar";
import AdminDashboard from './components/AdminDashboard';
import AdminDessertPanel from "./components/AdminDessertPanel";
import AboutPage from './components/pages/AboutPage';
import { useLocation } from 'react-router-dom';

const AppContent = () => {
    const location = useLocation();
    return (
        <>
        {location.pathname !== '/' && <Navbar />}
          <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:category" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterModal />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin/orders" element={<AdminOrdersPanel />} />
                <Route path="/admin/desserts" element={<AdminDessertPanel />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </>
    );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
