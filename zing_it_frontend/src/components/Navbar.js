// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import '../assets/css/Navbar.css';
import ZingLogo from '../assets/images/ZingLogo.png';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showChatModal, setShowChatModal] = useState(false);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('1'); // Default to the first room

  const handleChatClick = () => {
    setShowChatModal(true);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (username && roomId) {
      navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(roomId)}`);
      setShowChatModal(false);
      setUsername('');
      setRoomId('1');
    }
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
          <button onClick={handleChatClick} className="navbar-nav-item">Chat</button>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {showChatModal && (
        <div className="chat-modal-overlay">
          <div className="chat-modal">
            <h2 className="chat-modal-title">Join Chat Room</h2>
            <form onSubmit={handleChatSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="room">Select Room</label>
                <select
                  id="room"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                >
                  <option value="1">General</option>
                  <option value="2">Tech Talk</option>
                  <option value="3">VIP Room</option>
                </select>
              </div>
              <div className="chat-modal-buttons">
                <button type="submit" className="join-button">Join Chat</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowChatModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;