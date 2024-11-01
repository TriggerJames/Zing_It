// src/pages/RoomsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRESET_ROOMS } from '../config/rooms';
import '../assets/css/RoomsPage.css';

function RoomsPage() {
  const navigate = useNavigate();
  
  const handleJoinRoom = (room) => {
    if (room.isPrivate) {
      // Handle private room logic
      alert('This is a private room. Password required.');
      return;
    }
    
    const username = prompt('Enter your username:');
    if (!username) return;
    
    navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(room.id)}`);
  };

  return (
    <div className="rooms-page">
      <div className="rooms-container">
        <h1 className="rooms-title">Available Chat Rooms</h1>
        <div className="rooms-grid">
          {PRESET_ROOMS.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-card-content">
                <h2 className="room-name">
                  {room.name} {room.isPrivate && '🔒'}
                </h2>
                <p className="room-description">{room.description}</p>
                <button 
                  onClick={() => handleJoinRoom(room)}
                  className="join-button"
                >
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomsPage;