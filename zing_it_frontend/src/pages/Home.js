// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home({ isDarkMode }) {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    // Redirect to the login page
    navigate('/login');
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
    </div>
  );
}

export default Home;