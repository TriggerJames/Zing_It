// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css';

// Font Awesome for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/" className="footer-logo">
          Zing_It
        </Link>

        <nav className="footer-nav">
          <Link to="/about" className="footer-nav-item">About</Link>
          <Link to="/privacy" className="footer-nav-item">Privacy</Link>
          <Link to="/terms" className="footer-nav-item">Terms</Link>
          <Link to="/contact" className="footer-nav-item">Contact</Link>
        </nav>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} ChatApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;