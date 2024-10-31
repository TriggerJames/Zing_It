// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../assets/css/Navbar.css';

function Navbar({ isAuthenticated }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Zing_it
        </Link>
        
        <nav className="navbar-nav">
          <Link to="/" className="navbar-nav-item">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="navbar-nav-item">Chat</Link>
              <Link to="/profile" className="navbar-nav-item">Profile</Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                className="navbar-nav-item"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-nav-item">Login</Link>
              <Link to="/register" className="navbar-nav-item">Register</Link>
            </>
          )}
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;