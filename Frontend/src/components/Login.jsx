import React, { useState } from 'react';
import EntryField from './EntryField';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch('http://localhost:5050/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('✅ Login successful');
        // navigate("/dashboard"); // disable until dashboard is made
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <>
      <div className="body">
        <div className="flex_container">
          <h1>EmCore Shop System</h1>
        </div>

        <p className="login_instruct">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="login_box">
            <EntryField
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} //arrow function takes event(e),the event object reactgives when something happens, e.target=Dom element that triggered the event, e.target.value=the current text in the field, setUsername updates username to be whatevr the user typed
            />

            <EntryField
              label="Password"
              type="Password" //makes the user entry dots to hide the actual password typed from the UI
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
