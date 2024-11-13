// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import '../assets/css/AuthPages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from useAuth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3001/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          // Automatically log in the user after successful registration
          login({ username: formData.username, email: formData.email });
          navigate('/rooms'); // Redirect to RoomsPage
        } else {
          setErrors({ form: data.message });
        }
      } catch (error) {
        setErrors({ form: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleGoogleSignup = () => {
    // Dummy function for Google signup
    console.log('Google signup clicked');
  };

  const handleFacebookSignup = () => {
    // TODO: Implement Facebook signup logic
    console.log('Facebook signup clicked');
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      
      {/* Social Login Buttons */}
      <div className="social-auth-buttons">
        <button 
          type="button" 
          className="social-auth-button google"
          onClick={handleGoogleSignup}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span>Sign up with Google</span>
        </button>
        
        <button 
          type="button" 
          className="social-auth-button facebook"
          onClick={handleFacebookSignup}
        >
          <FontAwesomeIcon icon={faFacebookF} />
          <span>Sign up with Facebook</span>
        </button>
      </div>

      {/* Error Message */}
      {errors.form && <div className=" error-message">{errors.form}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange} 
        />
        {errors.username && <div className="error-message">{errors.username}</div>}

        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
        {errors.firstName && <div className="error-message">{errors.firstName}</div>}

        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
        {errors.lastName && <div className="error-message">{errors.lastName}</div>}

        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        {errors.password && <div className="error-message">{errors.password}</div>}

        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
        />
        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

        <button type="submit" className="auth-button">Register</button>
      </form>

      <div className="auth-separator">or</div>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default RegisterPage;