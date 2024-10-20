import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import moment from 'moment';

let socket;

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket = io('http://localhost:5000');
    
    const name = prompt("Enter your name:");
    const roomName = prompt("Enter the room you want to join:");

    setUserName(name);
    setRoom(roomName);

    socket.emit('join', { name, room: roomName }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong> <span>{moment(msg.time).format('h:mm a')}</span>: {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
