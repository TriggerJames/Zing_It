// src/pages/ChatPage.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CHAT_ROOMS } from '../config/rooms';
import '../assets/css/ChatPage.css';

function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const joinRoom = useCallback((room) => {
    if (socket) {
      if (room.isPrivate) {
        const password = prompt(`Enter password for ${room.name}:`);
        if (password !== room.password) {
          alert('Incorrect password');
          return;
        }
      }
      socket.emit('joinRoom', { roomId: room.id });
      setCurrentRoom(room);
      setMessages([]);
    }
  }, [socket]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentUsername = params.get('username');
    const roomId = params.get('roomId') || 'general';

    if (!currentUsername) {
      navigate('/');
      return;
    }

    setUsername(currentUsername);

    const newSocket = io('http://localhost:5000', {
      query: { username: currentUsername, roomId }
    });

    setSocket(newSocket);

    newSocket.on('message', (message) => {
       setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('disconnect', () => {
      setSocket(null);
    });

    const initialRoom = Object.values(CHAT_ROOMS).find(room => room.id === roomId) || CHAT_ROOMS.General;
    joinRoom(initialRoom);

    return () => {
      newSocket.close();
    };
  }, [location.search, navigate, joinRoom]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && newMessage.trim()) {
      socket.emit('sendMessage', { 
        message: newMessage,
        username,
        roomId: currentRoom.id 
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Rooms</h2>
        <ul>
          {Object.keys(CHAT_ROOMS).map((roomKey) => (
            <li key={roomKey}>
              <button
                className={`room-button ${currentRoom?.id === CHAT_ROOMS[roomKey].id ? 'active' : ''}`}
                onClick={() => joinRoom(CHAT_ROOMS[roomKey])}
              >
                {CHAT_ROOMS[roomKey].name}
              </button>
              {CHAT_ROOMS[roomKey].subCategories && (
                <ul className="sub-categories">
                  {Object.keys(CHAT_ROOMS[roomKey].subCategories).map((subRoomKey) => (
                    <li key={subRoomKey}>
                      <button
                        className={`sub-room-button ${currentRoom?.id === CHAT_ROOMS[roomKey].subCategories[subRoomKey].id ? 'active' : ''}`}
                        onClick={() => joinRoom(CHAT_ROOMS[roomKey].subCategories[subRoomKey])}
                      >
                        {CHAT_ROOMS[roomKey].subCategories[subRoomKey].name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        {currentRoom && (
          <>
            <div className="current-room-info">
              <h2>{currentRoom.name}</h2>
              <p>{currentRoom.description}</p>
            </div>
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.username === username ? 'message-self' : ''}`}>
                  <div className="message-info">
                    <span className="message-sender">{message.username === username ? 'You' : message.username}</span>
                  </div>
                  <div className="message-content">{message.message}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatPage;