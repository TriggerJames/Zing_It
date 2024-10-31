// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Styles
import './assets/css/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication check
    const checkAuth = async () => {
      // Here you would typically check if the user is authenticated
      // For example, by checking a token in local storage or making an API call
      const token = localStorage.getItem('token'); // Assuming you store the token in local storage
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />
              } />
              <Route path="/register" element={
                isAuthenticated ? <Navigate to="/" /> : <RegisterPage />
              } />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Chat Route */}
              <Route 
                path="/chat" 
                element={
                  isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
                } 
              />

              {/* Protected Routes */}
              <Route path="/profile" element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              } />

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;