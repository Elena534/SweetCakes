import React, { useState } from 'react';
import HomePage from './components/pages/HomePage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import CartPage from './components/pages/CartPage';
import LoginForm from './components/LoginForm';
import UserProfile from './components/pages/UserProfile';
import RegisterModal from "./components/RegisterModal";
import AdminOrdersPanel from './components/AdminOrdersPanel';
import Navbar from "./components/Navbar";
import AdminDashboard from './components/AdminDashboard';
import AdminDessertPanel from "./components/AdminDessertPanel";
import AboutPage from './components/pages/AboutPage';
import LoginModal from "./components/LoginForm";
import { CartProvider } from './context/CartContext';
import IndividualorderPage from "./components/pages/individualorder";
import PaymentDeliveryPage from "./components/pages/paymentdelivery";

const AppContent = ({ openLoginModal }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar openLoginModal={openLoginModal} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersPanel />} />
        <Route path="/admin/desserts" element={<AdminDessertPanel />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/individualorder" element={<IndividualorderPage />} />
        <Route path="/payment" element={<PaymentDeliveryPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <CartProvider>
      <Router>
        <AppContent openLoginModal={openLoginModal} />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </Router>
    </CartProvider>
  );
};

export default App;