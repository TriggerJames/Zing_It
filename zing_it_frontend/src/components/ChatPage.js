// src/components/ChatPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const PRESET_ROOMS = [
  { id: 1, name: 'General', description: 'General discussion' },
  { id: 2, name: 'Technology', description: 'Tech talks' },
  { id: 3, name: 'Gaming', description: 'Gaming discussions' },
  { id: 4, name: 'Music', description: 'Music lovers' },
  { id: 5, name: 'Movies', description: 'Movie discussions' }
];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState(null);
  const location = useLocation();
  
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const username = useMemo(() => params.get('name'), [params]);

  useEffect(() => {
    const roomFromUrl = params.get('room');
    const initialRoom = PRESET_ROOMS.find(r => 
      r.name.toLowerCase() === (roomFromUrl || '').toLowerCase()
    ) || PRESET_ROOMS[0];
    setActiveRoom(initialRoom);
  }, [params]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeRoom) {
      const newMessage = {
        id: Date.now(),
        user: username,
        text: message,
        room: activeRoom.id,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const changeRoom = (room) => {
    setActiveRoom(room);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
          {PRESET_ROOMS.map(room => (
            <div
              key={room.id}
              className={`p-3 mb- 2 rounded-lg ${activeRoom?.id === room.id ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
              onClick={() => changeRoom(room)}
            >
              <h4 className="text-lg">{room.name}</h4>
              <small>{room.description}</small>
            </div>
          ))}
        </div>

        <div className="w-3/4 pl-4">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{activeRoom?.name}</h2>
            <p className="text-lg mb-4">Welcome, {username}</p>
            <div className="flex flex-wrap">
              {messages
                .filter(msg => msg.room === activeRoom?.id)
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`w-full mb-4 p-4 rounded-lg ${msg.user === username ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
                  >
                    <strong>{msg.user}</strong>
                    <span>{msg.text}</span>
                  </div>
                ))}
            </div>
          </div>

          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Type a message..."
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;