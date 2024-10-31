// src/components/ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../assets/css/ChatPage.css';

function ChatPage({ isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Get username and roomId from URL parameters
  const params = new URLSearchParams(location.search);
  const username = params.get('username');
  const roomId = params.get('roomId');

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Redirect if no username or roomId
    if (!username || !roomId) {
      navigate('/');
      return;
    }

    // Connect to socket server
    const newSocket = io('http://localhost:5000', {
      query: { username, roomId }
    });

    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsLoading(false);
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    newSocket.on('updateUsers', (users) => {
      setOnlineUsers(users);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [username, roomId, navigate]);

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
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="room-info">
          <h2 className="room-title">Chat Room</h2>
          <p className="room-id">Room ID: {roomId}</p>
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
                <textarea
                  className="message-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="send-button"
                  disabled={!message.trim()}
                >
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