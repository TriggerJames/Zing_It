// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Header.css';

function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-container">
            <span className="logo-text">Zing_it</span>
          </div>
        </Link>

        <nav className="nav-menu">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="nav-link">
                <span className="nav-icon">💭</span>
                <span className="nav-text">Chat</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link">
                <span className="nav-icon">👤</span>
                <span className="nav-text">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="mode-icon">
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            <span className="mode-text">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;