// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home({ isDarkMode }) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleJoinChat = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate inputs
      if (!username.trim() || !roomId.trim()) {
        throw new Error('Username and Room ID are required');
      }

      // Show success message
      setSuccess('Joining chat room...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to chat room
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

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">💬</div>
          <h2 className="feature-title">Real-time Chat</h2>
          <p className="feature-description">
            Experience seamless real-time communication with instant message delivery.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h2 className="feature-title">Secure Rooms</h2>
          <p className="feature-description">
            Join private chat rooms with unique IDs for secure conversations.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h2 className="feature-title">Group Chat</h2>
          <p className="feature-description">
            Create or join group conversations with multiple participants.
          </p>
        </div>
      </section>

      {/* Join Chat Section */}
      <section className="join-section">
        <h2 className="join-title">Join a Chat Room</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleJoinChat} className="join-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId" className="form-label">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              className="form-input"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="join-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              'Join Chat'
            )}
          </button>
        </form>
      </section>

      {/* Quick Start Guide */}
      <section className="feature-card" style={{ marginTop: '2rem' }}>
        <div className="feature-icon">📝</div>
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