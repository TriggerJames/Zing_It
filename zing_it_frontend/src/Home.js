import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from './AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { toggleDarkMode } = useContext(AppContext);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <button onClick={() => navigate('/chat')}>Go to Chat</button>
      <button onClick={toggleDarkMode}>Toggle Dark/Light Mode</button>
    </div>
  );
};

export default Home;