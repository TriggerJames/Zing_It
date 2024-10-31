// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && room) {
      navigate(`/chat?name=${encodeURIComponent(name)}&room=${encodeURIComponent(room)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Welcome to Zing_it</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-lg mb-4">Zing_it is a real-time chat application that allows you to communicate with others instantly.</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Join different chat rooms based on your interests</li>
          <li>Send and receive messages in real-time</li>
          <li>Enjoy a user-friendly interface with dark mode support</li>
          <li>Connect with people from around the world</li>
        </ul>
      </div>
      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Join a Chat Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room:</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Join Chat</button>
        </form>
      </div>
    </div>
  );
};

export default Home;