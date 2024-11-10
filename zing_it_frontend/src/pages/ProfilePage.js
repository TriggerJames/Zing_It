// src/pages/ProfilePage.js

import React, { useState } from 'react';
import '../assets/css/ProfilePage.css';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    displayName: 'Big Mitch',
    email: 'mitch@example.com',
    bio: 'Hello, I am Mitch!',
    theme: 'light',
    notifications: true,
    language: 'en'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will update this to send the updated profile data to a server
    console.log('Updated profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <img src="/default-avatar.png" alt="Profile" className="profile-avatar" />
          <h2>{profileData.displayName}</h2>
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={profileData.displayName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={profileData.theme}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={profileData.language}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={profileData.notifications}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              Enable Notifications
            </label>
          </div>
          {isEditing ? (
            <div className="button-group">
              <button type="submit" className="button button-primary">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="button">Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)} className="button button-primary">Edit Profile</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;