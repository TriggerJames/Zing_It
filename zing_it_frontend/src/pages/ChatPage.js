// src/pages/ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CHAT_ROOMS } from '../config/rooms';
import '../assets/css/ChatPage.css';

function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');
    const username = params.get('username');

    if (!roomId || !username) {
      navigate('/rooms');
      return;
    }

    // Find the room details
    const room = Object.values(CHAT_ROOMS).find(r => r.id === roomId);
    if (!room) {
      navigate('/rooms');
      return;
    }

    setUsername(username);
    setCurrentRoom(room);

    // Connect to socket server
    const newSocket = io('http://localhost:5000', {
      query: { username, roomId }
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
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

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [location.search, navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      const messageData = {
        roomId: currentRoom.id,
        message: inputMessage,
        username,
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
              className={`message ${msg.username === username ? 'message-self' : ''} ${msg.type === 'system' ? 'message-system' : ''}`}
            >
              {msg.type === 'system' ? (
                <div className="message-system-content">{msg.content}</div>
              ) : (
                <>
                  <div className="message-header">
                    <span className="message-username">
                      {msg.username === username ? 'You' : msg.username}
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