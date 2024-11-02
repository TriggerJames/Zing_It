// src/pages/ChatPage.js

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CHAT_ROOMS } from '../config/rooms';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/ChatPage.css';
import notificationSound from '../assets/sounds/notification.mp3';

function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();
  const audioRef = useRef(new Audio(notificationSound));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId') || 'general';

    if (!currentUser) {
      navigate('/login');
      return;
    }

    const room = Object.values(CHAT_ROOMS).find(r => r.id === roomId);
    if (!room) {
      navigate('/rooms');
      return;
    }

    setCurrentRoom(room);

    const newSocket = io('http://localhost:5000', {
      query: { username: currentUser.username, roomId }
    });

    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
      if (message.username !== currentUser.username) {
        audioRef.current.play();
      }
    });

    newSocket.on('userJoined', (data) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${data.username} has joined the room`
      }]);
      setOnlineUsers(data.users);
    });

    newSocket.on('userLeft', (data) => {
      setMessages(prev => [...prev, {
        type: 'system',
        content: `${data.username} has left the room`
      }]);
      setOnlineUsers(data.users);
    });

    return () => {
      newSocket.close();
    };
  }, [location.search, navigate, currentUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      const messageData = {
        roomId: currentRoom.id,
        message: inputMessage,
        username: currentUser.username,
        timestamp: new Date().toISOString()
      };

      socket.emit('sendMessage', messageData);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="room-info">
          <h2 className="room-title">{currentRoom?.name}</h2>
          <p>{currentRoom?.description}</p>
        </div>
        
        <div className="online-users">
          <h3>Online Users ({onlineUsers.length})</h3>
          {onlineUsers.map((user, index) => (
            <div key={index} className="online-user">
              <span className="online-indicator"></span>
              <span>{user}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.username === currentUser.username ? 'message-self' : ''} ${msg.type === 'system' ? 'message-system' : ''}`}
            >
              {msg.type === 'system' ? (
                 <div className="message-system-content">{msg.content}</div>
              ) : (
                <>
                  <div className="message-header">
                    <span className="message-username">
                      {msg.username === currentUser.username ? 'You' : msg.username}
                    </span>
                    <span className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-content">{msg.message}</div>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            className="message-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!inputMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;