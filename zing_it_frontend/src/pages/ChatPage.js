// src/pages/ChatPage.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { PRESET_ROOMS } from '../config/rooms';
import '../assets/css/ChatPage.css';

function ChatPage({ isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');
  const messagesEndRef = useRef(null);
  
  // Get username and roomId from URL parameters
  const params = new URLSearchParams(location.search);
  const username = params.get('username');
  const roomId = params.get('roomId');

  // Find current room details
  const currentRoom = PRESET_ROOMS.find(room => room.id.toString() === roomId) || {
    name: 'Custom Room',
    description: 'User created room'
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connectToRoom = useCallback((newRoomId) => {
    const newSocket = io('http://localhost:5000', {
      query: { username, roomId: newRoomId }
    });

    setSocket(newSocket);
    setMessages([]); // Clear messages when changing rooms
  }, [username]);

  const handleRoomChange = (selectedRoom) => {
    if (selectedRoom.isPrivate) {
      setShowRoomModal(true);
      return;
    }
    
    // Navigate to the new room
    navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(selectedRoom.id)}`);
    
    // Reconnect socket for new room
    if (socket) {
      socket.disconnect();
      connectToRoom(selectedRoom.id);
    }
  };

  const handlePasswordSubmit = (e, selectedRoom) => {
    e.preventDefault();
    if (roomPassword === selectedRoom.password) {
      setShowRoomModal(false);
      setRoomPassword('');
      navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(selectedRoom.id)}`);
      
      if (socket) {
        socket.disconnect();
        connectToRoom(selectedRoom.id);
      }
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (!username || !roomId) {
      navigate('/');
      return;
    }

    connectToRoom(roomId);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [username, roomId, navigate, connectToRoom, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsLoading(false);
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    socket.on('updateUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('updateUsers');
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = {
        content: message,
        sender: username,
        timestamp: new Date().toISOString(),
        roomId: roomId
      };

      socket.emit('message', messageData);
      setMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

return (
  <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
    {/* Room Selection Modal */}
    {showRoomModal && (
      <div className="room-modal-overlay">
        <div className="room-modal">
          <h3>Enter Room Password</h3>
          <form onSubmit={(e) => handlePasswordSubmit(e, PRESET_ROOMS.find(room => room.isPrivate))}>
            <input
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div className="room-modal-buttons">
              <button type="submit">Join Room</button>
              <button type="button" onClick={() => setShowRoomModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Sidebar */}
    <aside className="chat-sidebar">
      <div className="room-info">
        <h2 className="room-title">{currentRoom.name}</h2>
        <p className="room-description">{currentRoom.description}</p>
        
        {/* Room Selection Dropdown */}
        <div className="room-selector">
          <select 
            value={roomId}
            onChange={(e) => handleRoomChange(PRESET_ROOMS.find(room => room.id.toString() === e.target.value))}
            className="room-select"
          >
            {PRESET_ROOMS.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} {room.isPrivate ? '🔒' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="online-users">
        <h3 className="online-users-title">Online Users ({onlineUsers.length})</h3>
        <ul className="users-list">
          {onlineUsers.map((user, index) => (
            <li key={index} className="user-item">
              <span className="user-status"></span>
              <span className="user-name">{user}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>

    {/* Main Chat Area */}
    <main className="chat-main">
      {isLoading ? (
        <div className="loading-messages">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === username ? 'message-self' : 'message-other'}`}
              >
                <div className="message-info">
                  <span className="message-sender">
                    {msg.sender === username ? 'You' : msg.sender}
                  </span>
                  <span className="message-time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="message-send-btn">
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  </div>
);
}

export default ChatPage;