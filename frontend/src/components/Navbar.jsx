import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
// import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUserStore();
  // const { cart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartItemsCount = user?.cart?.length || 0; // Assuming user.cart is an array of cart items

  return (
    <nav className=" sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Luxe<span className="text-green-300">Shop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-white hover:text-green-300 transition-colors px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/category/electronics" className="text-white/80 hover:text-green-300 transition-colors px-3 py-2 text-sm font-medium">
                Electronics
              </Link>
              <Link to="/category/fashion" className="text-white/80 hover:text-green-300 transition-colors px-3 py-2 text-sm font-medium">
                Fashion
              </Link>
              <Link to="/category/home-garden" className="text-white/80 hover:text-green-300 transition-colors px-3 py-2 text-sm font-medium">
                Home & Garden
              </Link>
              <Link to="/category/sports" className="text-white/80 hover:text-green-300 transition-colors px-3 py-2 text-sm font-medium">
                Sports
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/20 border border-white/30 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="text-white hover:text-green-300 transition-colors p-2">
                  <Heart className="h-6 w-6" />
                </button>
                <Link to="/cart" className="text-white hover:text-green-300 transition-colors p-2 relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-400 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-white hover:text-green-300 transition-colors p-2 flex items-center gap-2"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm">{user.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                      <div className="py-2">
                        <div className="px-4 py-2 text-sm text-white/70 border-b border-white/20">
                          {user.email}
                        </div>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin-dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-green-300 transition-colors px-4 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-400 hover:bg-green-300 text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-green-300 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/20 border border-white/30 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
              </div>
            </div>
            <Link to="/" className="text-white hover:text-green-300 block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link to="/category/electronics" className="text-white/80 hover:text-green-300 block px-3 py-2 text-base font-medium">
              Electronics
            </Link>
            <Link to="/category/fashion" className="text-white/80 hover:text-green-300 block px-3 py-2 text-base font-medium">
              Fashion
            </Link>
            <Link to="/category/home-garden" className="text-white/80 hover:text-green-300 block px-3 py-2 text-base font-medium">
              Home & Garden
            </Link>
            <Link to="/category/sports" className="text-white/80 hover:text-green-300 block px-3 py-2 text-base font-medium">
              Sports
            </Link>
            
            {user ? (
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center space-x-4 px-3 py-2">
                  <button className="text-white hover:text-green-300 transition-colors p-2">
                    <Heart className="h-6 w-6" />
                  </button>
                  <Link to="/cart" className="text-white hover:text-green-300 transition-colors p-2 relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-400 text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-green-300 transition-colors p-2"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-3 py-2 text-sm text-white/70">
                  Welcome, {user.name}
                </div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="text-white hover:text-green-300 block px-3 py-2 text-base font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4 space-y-2 px-3">
                <Link to="/login" className="text-white hover:text-green-300 block py-2 text-base font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-green-400 hover:bg-green-300 text-gray-900 block px-4 py-2 rounded-full text-base font-medium transition-colors text-center">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;