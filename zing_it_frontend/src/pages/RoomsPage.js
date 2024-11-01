// src/pages/RoomsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { CHAT_ROOMS } from '../config/rooms';
import '../assets/css/RoomsPage.css';

function RoomsPage() {
  // Convert the CHAT_ROOMS object into a flat array of all rooms including subcategories
  const getAllRooms = () => {
    const rooms = [];
    Object.values(CHAT_ROOMS).forEach(room => {
      rooms.push({
        id: room.id,
        name: room.name,
        description: room.description,
        isPrivate: room.isPrivate
      });
      
      if (room.subCategories) {
        Object.values(room.subCategories).forEach(subRoom => {
          rooms.push({
            id: subRoom.id,
            name: subRoom.name,
            description: subRoom.description,
            isPrivate: subRoom.isPrivate
          });
        });
      }
    });
    return rooms;
  };

  return (
    <div className="rooms-container">
      <h1>Available Chat Rooms</h1>
      <div className="rooms-grid">
        {getAllRooms().map(room => (
          <div key={room.id} className="room-card">
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            {room.isPrivate ? (
              <span className="private-badge">Private</span>
            ) : (
              <Link 
                to={`/chat?roomId=${room.id}`} 
                className="join-room-button"
              >
                Join Room
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;