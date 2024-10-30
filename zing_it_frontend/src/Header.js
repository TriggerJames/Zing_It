// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css'; // Import the CSS file

const Header = () => {
    const logo = process.env.PUBLIC_URL + '/Zing.png'; // Reference the image in the public folder

    return (
        <header className="header">
            <Link to="/" className="logo-link"> {/* Link to the landing page */}
                <img src={logo} alt="Zing_It Logo" className="logo" />
            </Link>
        </header>
    );
};

export default Header;