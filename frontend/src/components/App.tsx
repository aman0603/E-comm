import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/useUserStore';
import { useCartStore } from './store/useCartStore';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard';

// Components
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #1f4037, #99f2c8)",
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route 
              path="/admin-dashboard" 
              element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
            />
          </Routes>
        </Router>
      </div>
      <Toaster />
    </div>
  );
}

export default App;