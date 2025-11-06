import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [token, setToken] = useState(localStorage.getItem('token'));

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Decode the JWT token and set user state
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
      localStorage.setItem('user', JSON.stringify(decodedToken)); 
    }
  }, [token]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setToken(null);
    setUser(null);
    setCart([]);
  };

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.product._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

  // ✅ Update item quantity in cart (for + / - buttons)
  const updateCartQty = (itemId, newQty) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product._id === itemId ? { ...item, qty: newQty } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        cart, 
        login, 
        logout, 
        addToCart, 
        removeFromCart, 
        updateCartQty, 
        backendUrl 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
