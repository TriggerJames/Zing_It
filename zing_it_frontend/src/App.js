// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import Chat from './Chat';
import AppContext from './AppContext';
import Header from './Header'; // Import the Header component

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <AppContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <Router>
                <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                    <Header /> {/* Include the Header component */}
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </div>
            </Router>
        </AppContext.Provider>
    );
};

export default App;