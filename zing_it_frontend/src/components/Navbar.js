// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../assets/css/Navbar.css';
import ZingLogo from '../assets/images/ZingLogo.png';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChatClick = () => {
    // Redirect to the rooms page
    navigate('/rooms');
  };

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={ZingLogo} alt="Zing_it Logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Zing_it</span>
        </Link>
        
        <nav className="navbar-nav">
          <Link to="/" className="navbar-nav-item">Home</Link>
          <button 
            onClick={handleChatClick} 
            className="navbar-nav-item"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'inherit',
              padding: 'inherit'
            }}
          >
            Chat Rooms
          </button>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;