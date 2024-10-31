// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import '../assets/css/ProfilePage.css';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    bio: '',
    theme: 'light',
    notifications: true,
    language: 'en'
  });
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Implement your own profile loading logic here
      // For now, we'll use mock data
      const mockUser = {
        displayName: 'John Doe',
        email: 'john@example.com',
        photoURL: '/default-avatar.png',
        bio: 'Hello, I am John!',
        theme: 'light',
        notifications: true,
        language: 'en'
      };
      setProfileData(mockUser);
    } catch (err) {
      setError('Failed to load profile data');
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewProfileImage(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Implement your own profile update logic here
      console.log('Updating profile with:', profileData);
      console.log('New profile image:', newProfileImage);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setNewProfileImage(null);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile Settings</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={profileData.photoURL || '/default-avatar.png'}
              alt="Profile"
              className="profile-image"
            />
            {isEditing && (
              <div className="profile-image-upload">
                <label htmlFor="profile-image-input" className="image-upload-label">
                  Change Photo
                </label>
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={profileData.email}
              disabled
              className="disabled"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              disabled={!isEditing}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Theme</label>
            <select
              value={profileData.theme}
              onChange={(e) => setProfileData({...profileData, theme: e.target.value})}
              disabled={!isEditing}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select
              value={profileData.language}
              onChange={(e) => setProfileData({...profileData, language: e.target.value})}
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
                checked={profileData.notifications}
                onChange={(e) => setProfileData({...profileData, notifications: e.target.checked})}
                disabled={!isEditing}
              />
              Enable Notifications
            </label>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="save-button"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    loadUserProfile();
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>

        <div className="danger-zone">
          <h2>Danger Zone</h2>
          <button className="delete-account-button">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;