

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, User, LogOut, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout, cart } = useContext(AppContext);
  const cartItemCount = cart?.reduce((acc, item) => acc + item.qty, 0) || 0;
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <ShoppingCart className="text-indigo-600 w-6 h-6" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">
              Mock<span className="text-indigo-200">-Ecom-Cart</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:shadow-lg relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center">
            {/* cart icon on mobile */}
            <Link
              to="/cart"
              className="relative mr-2 inline-flex items-center p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-white hover:bg-white/10 transition-all duration-150"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? 'max-h-80' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col py-2 space-y-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex flex-col px-4 py-2 space-y-2 border-t border-white/10">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg w-full justify-center"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col px-4 py-2 space-y-2 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
