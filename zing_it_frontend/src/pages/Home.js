// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home({ isDarkMode }) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('1');
  const navigate = useNavigate();

  const handleStartChatting = () => {
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
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Zing_it Chat</h1>
        <p className="hero-subtitle">
          Connect with friends and colleagues in real-time through our secure and intuitive chat platform.
        </p>
        <button onClick={handleStartChatting} className="cta-button">
          Start Chatting Now
        </button>
      </section>

      {/* Quick Start Guide */}
      <section className="feature-card">
        <h2 className="feature-title">Quick Start Guide</h2>
        <p className="feature-description">
          1. Click "Start Chatting Now"<br />
          2. Enter your preferred username<br />
          3. Select a chat room<br />
          4. Start chatting with others in the room
        </p>
      </section>

      {/* Chat Modal */}
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
    </div>
  );
}

export default Home;