// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/Navbar.css';
import ZingLogo from '../assets/images/ZingLogo.png';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/rooms');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src={ZingLogo} 
            alt="Zing_it Logo" 
            className="navbar-logo-image"
          />
        </Link>
        
        <nav className="navbar-nav">
          <Link to="/" className="navbar-nav-item">
            Home
          </Link>
          <button 
            onClick={handleChatClick} 
            className="navbar-nav-item"
          >
            Chat Rooms
          </button>
          {currentUser && (
            <Link to="/profile" className="navbar-nav-item">
              Profile
            </Link>
          )}
        </nav>

        <div className="navbar-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {currentUser ? (
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="login-button"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;