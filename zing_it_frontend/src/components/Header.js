// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Zing_it
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-indigo-200">Home</Link></li>
            <li><Link to="/chat" className="hover:text-indigo-200">Chat</Link></li>
          </ul>
        </nav>
        <button onClick={toggleDarkMode} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;