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
import LayoutWithFooter from './components/LayoutWithFooter';

const AppContent = ({ openLoginModal }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar openLoginModal={openLoginModal} />}
      <Routes>
        {/* Страницы без футера */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterModal />} />

        {/* Страницы с футером */}
        <Route path="/:category" element={
          <LayoutWithFooter>
            <CategoryPage />
          </LayoutWithFooter>
        } />
        <Route path="/cart" element={
          <LayoutWithFooter>
            <CartPage />
          </LayoutWithFooter>
        } />
        <Route path="/user" element={
          <LayoutWithFooter>
            <UserProfile />
          </LayoutWithFooter>
        } />
        <Route path="/profile" element={
          <LayoutWithFooter>
            <UserProfile />
          </LayoutWithFooter>
        } />
        <Route path="/admin" element={
          <LayoutWithFooter>
            <AdminDashboard />
          </LayoutWithFooter>
        } />
        <Route path="/admin/orders" element={
          <LayoutWithFooter>
            <AdminOrdersPanel />
          </LayoutWithFooter>
        } />
        <Route path="/admin/desserts" element={
          <LayoutWithFooter>
            <AdminDessertPanel />
          </LayoutWithFooter>
        } />
        <Route path="/about" element={
          <LayoutWithFooter>
            <AboutPage />
          </LayoutWithFooter>
        } />
        <Route path="/individualorder" element={
          <LayoutWithFooter>
            <IndividualorderPage />
          </LayoutWithFooter>
        } />
        <Route path="/payment" element={
          <LayoutWithFooter>
            <PaymentDeliveryPage />
          </LayoutWithFooter>
        } />
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