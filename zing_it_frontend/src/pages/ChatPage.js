// src/pages/ChatPage.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CHAT_ROOMS, getRoomById } from '../config/rooms';
import '../assets/css/ChatPage.css';

function ChatPage({ isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Memoize joinRoom function
  const joinRoom = useCallback((roomId) => {
    if (socket) {
      const room = getRoomById(roomId);
      if (room) {
        if (room.isPrivate) {
          // Implement password prompt for private rooms
          const password = prompt(`Enter password for ${room.name}:`);
          if (password !== room.password) {
            alert('Incorrect password');
            return;
          }
        }
        socket.emit('joinRoom', { roomId });
        setCurrentRoom(room);
        setMessages([]);
      }
    }
  }, [socket]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const roomId = params.get('roomId') || 'general';

    if (!username) {
      navigate('/');
      return;
    }

    const newSocket = io('http://localhost:5000', {
      query: { username, roomId }
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsLoading(false);
      joinRoom(roomId);
    });

    newSocket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    newSocket.on('updateUsers', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [location, navigate, joinRoom]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket && currentRoom) {
      const messageData = {
        content: newMessage.trim(),
        sender: socket.query.username,
        roomId: currentRoom.id,
        timestamp: new Date().toISOString()
      };

      socket.emit('message', messageData);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div className="loading-messages">Loading...</div>;
  }

  return (
    <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="room-info">
          <h2 className="room-title">Chat Rooms</h2>
        </div>

        <nav className="room-nav">
          {Object.entries(CHAT_ROOMS).map(([key, room]) => (
            <div key={room.id} className="room-category">
              <button
                onClick={() => joinRoom(room.id)}
                className={`room-button ${currentRoom?.id === room.id ? 'active' : ''}`}
              >
                {room.name}
              </button>
              {room.subCategories && (
                <div className="sub-categories">
                  {Object.values(room.subCategories).map(subRoom => (
                    <button
                      key={subRoom.id}
                      onClick={() => joinRoom(subRoom.id)}
                      className={`sub-room-button ${currentRoom?.id === subRoom.id ? 'active' : ''}`}
                    >
                      {subRoom.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

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
        <div className="current-room-info">
          <h2>{currentRoom?.name}</h2>
          <p>{currentRoom?.description}</p>
        </div>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === socket?.query.username ? 'message-self' : ''}`}
            >
              <div className="message-info">
                <span className="message-sender">
                  {msg.sender === socket?.query.username ? 'You' : msg.sender}
                </span>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-container">
          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChatPage;