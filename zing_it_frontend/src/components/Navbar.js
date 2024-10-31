// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../assets/css/Navbar.css'; // Add your styles here

function Navbar({ user }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ChatApp
        </Link>
        <nav className="navbar-nav">
          <Link to="/" className="navbar-nav-item">Home</Link>
          <Link to="/about" className="navbar-nav-item">About</Link>
          <Link to="/privacy" className="navbar-nav-item">Privacy</Link>
          <Link to="/terms" className="navbar-nav-item">Terms</Link>
          <Link to="/contact" className="navbar-nav-item">Contact</Link>
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