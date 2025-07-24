import React, { useState } from 'react';
import EntryField from './EntryField';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5050/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/Home');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">
              <FaUser />
            </div>
            <h1>EmCore Shop System</h1>
          </div>
          <p className="login-subtitle">
            Welcome back! Please sign in to your account
          </p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-form">
            <EntryField
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} //arrow function takes event(e),the event object reactgives when something happens, e.target=Dom element that triggered the event, e.target.value=the current text in the field, setUsername updates username to be whatevr the user typed
            />

            <div className="password-field-wrapper">
              <EntryField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loading-spinner"></div> : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p>&copy; 2024 EmCore Shop System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
