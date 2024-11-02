// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home({ isDarkMode }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // You can replace this with your actual authentication check
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleStartChatting = () => {
    if (isLoggedIn) {
      // Redirect to chat rooms if user is logged in
      navigate('/rooms');
    } else {
      // Redirect to login if user is not logged in
      navigate('/login');
    }
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className={`hero-title ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to Zing_it Chat
        </h1>
        <p className={`hero-subtitle ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Connect with friends and colleagues in real-time through our secure and intuitive chat platform.
        </p>
        <button 
          onClick={handleStartChatting} 
          className="cta-button hover:scale-105 transition-transform duration-200"
        >
          {isLoggedIn ? 'Go to Chat Rooms' : 'Start Chatting Now'}
        </button>
      </section>

      {/* Quick Start Guide */}
      <section className={`feature-card ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className={`feature-title ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Start Guide
        </h2>
        <p className={`feature-description ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          1. {isLoggedIn ? 'Click "Go to Chat Rooms"' : 'Click "Start Chatting Now"'}<br />
          {!isLoggedIn && '2. Login or create an account\n'}
          {isLoggedIn ? '2.' : '3.'} Select a chat room<br />
          {isLoggedIn ? '3.' : '4.'} Start chatting with others in the room
        </p>
      </section>
    </div>
  );
}

export default Home;