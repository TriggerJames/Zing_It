import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to Zing It</h1>
      <button onClick={() => navigate('/home')}>Get Started</button>
    </div>
  );
};

export default Landing;