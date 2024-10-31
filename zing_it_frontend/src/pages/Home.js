// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home({ isDarkMode }) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoinChat = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!username.trim() || !roomId.trim()) {
        throw new Error('Username and Room ID are required');
      }

      // Navigate to chat room with query parameters
      navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(roomId)}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
      </section>

      {/* Join Chat Section */}
      <section className="join-section">
        <h2 className="join-title">Join a Chat Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleJoinChat} className="join-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId">Room ID</label>
            <input
              type="text"
              id="roomId"
              className="form-input"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              required
            />
          </div>

          <button
            type="submit"
            className="join-button"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Chat'}
          </button>
        </form>
      </section>

      {/* Quick Start Guide */}
      <section className="feature-card" style={{ marginTop: '2rem' }}>
        <h2 className="feature-title">Quick Start Guide</h2>
        <p className="feature-description">
          1. Enter your preferred username<br />
          2. Create or enter an existing room ID<br />
          3. Click "Join Chat" to start chatting<br />
          4. Share the room ID with others to chat together
        </p>
      </section>
    </div>
  );
}

export default Home;