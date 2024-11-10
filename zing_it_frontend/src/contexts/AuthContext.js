import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser , setCurrentUser ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser (JSON.parse(user));
    }
  }, []);

  const login = (userData) => {
    setCurrentUser (userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/'); // Redirect to home or desired route after login
  };

  const logout = () => {
    setCurrentUser (null);
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login after logout
  };

  const value = {
    currentUser ,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};