import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CHAT_ROOMS } from '../config/rooms';
import '../assets/css/ChatPage.css';

function ChatPage({ isDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const roomId = params.get('roomId');
    const subcategoryId = params.get('subcategoryId');

    if (!username || !roomId) {
      navigate('/');
      return;
    }

    const room = CHAT_ROOMS.find(r => r.id.toString() === roomId);
    if (!room) {
      navigate('/');
      return;
    }

    setCurrentRoom(room);
    if (subcategoryId) {
      const subcategory = room.subcategories.find(sub => sub.id === subcategoryId);
      setCurrentSubcategory(subcategory);
    }

    const newSocket = io('http://localhost:5000', {
      query: { username, roomId, subcategoryId }
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsLoading(false);
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
  }, [location, navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        content: newMessage.trim(),
        sender: socket.query.username,
        roomId: currentRoom.id,
        subcategoryId: currentSubcategory?.id,
        timestamp: new Date().toISOString()
      };

      socket.emit('message', messageData);
      setNewMessage('');
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const username = new URLSearchParams(location.search).get('username');
    navigate(`/chat?username=${encodeURIComponent(username)}&roomId=${encodeURIComponent(currentRoom.id)}&subcategoryId=${encodeURIComponent(subcategoryId)}`);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="room-info">
          <h2 className="room-title">{currentRoom?.name}</h2>
          <p className="room-description">{currentRoom?.description}</p>
        </div>

        <div className="subcategories">
          <h3>Subcategories</h3>
          <ul className="subcategory-list">
            {currentRoom?.subcategories.map(subcategory => (
              <li 
                key={subcategory.id}
                className={`subcategory-item ${currentSubcategory?.id === subcategory.id ? 'active' : ''}`}
              >
                <button
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className="subcategory-button"
                >
                  {subcategory.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="online-users">
          <h3>Online Users ({onlineUsers.length})</h3>
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
      </main>
    </div>
  ); }

export default ChatPage;