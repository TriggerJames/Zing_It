// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/images/ZingLogo.png'; // Import the logo
import '../assets/css/Navbar.css';

function Navbar({ user }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Zing_it Logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Zing_it</span>
        </Link>
        <nav className="navbar-nav">
          <Link to="/" className="navbar-nav-item">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="navbar-nav-item">Profile</Link>
              <Link to="/logout" className="navbar-nav-item">Logout</Link>
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