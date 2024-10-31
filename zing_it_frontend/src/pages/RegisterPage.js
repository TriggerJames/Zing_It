// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters long' },
    { regex: /[0-9]/, text: 'At least one number' },
    { regex: /[a-z]/, text: 'At least one lowercase letter' },
    { regex: /[A-Z]/, text: 'At least one uppercase letter' },
    { regex: /[^A-Za-z0-9]/, text: 'At least one special character' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) { newErrors.username = 'Username is required'; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required'; }
    if (!formData.password.trim()) { newErrors.password = 'Password is required'; }
    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; }

    for (const requirement of passwordRequirements) {
      if (!requirement.regex.test(formData.password)) {
        newErrors.password = `Password must ${requirement.text}`;
        break;
      }
    }

    if (!formData.acceptTerms) { newErrors.acceptTerms = 'You must accept the terms and conditions'; }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      try {
        // Implement your own registration logic here
        console.log('Registering user with:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        navigate('/login', { replace: true });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          <ul className="password-requirements">
            {passwordRequirements.map((requirement, index) => (
              <li key={index}>
                <span
                  className={requirement.regex.test(formData.password) ? 'valid' : 'invalid'}
                >
                  {requirement.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
            />
            I accept the terms and conditions
          </label>
          {errors.acceptTerms && <div className="error-message">{errors.acceptTerms}</div>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="register-button"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;