// src/pages/RoomsPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHAT_ROOMS } from '../config/rooms';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/RoomsPage.css';

function RoomsPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleJoinRoom = (room) => {
    if (!username.trim()) {
      alert('Please enter a username to join the room');
      return;
    }

    // For private rooms, handle password check
    if (room.isPrivate) {
      const password = prompt('Enter room password:');
      if (password !== room.password) {
        alert('Incorrect password');
        return;
      }
    }

    navigate(`/chat?roomId=${room.id}&username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1 className="rooms-title">Welcome to Zing_it Chat</h1>
        <p className="rooms-subtitle">Join a room to start chatting</p>
      </div>

      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="rooms-list">
        {Object.values(CHAT_ROOMS).map((room) => (
          <div key={room.id} className="room-item">
            <h3 className="room-name">{room.name}</h3>
            <p className="room-description">{room.description}</p>
            <button
              className="join-button"
              onClick={() => handleJoinRoom(room)}
            >
              {room.isPrivate ? 'Join (Private)' : 'Join Room'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;