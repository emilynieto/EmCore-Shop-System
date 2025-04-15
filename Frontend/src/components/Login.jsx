import { useState } from 'react';
import EntryField from './EntryField';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div className="body">
        <div className="flex_container">
          <h1>EmCore Shop System</h1>
        </div>

        <p className="login_instruct">Login to your account</p>

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
            palceholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Enter</button>
        </div>
      </div>
    </>
  );
}

export default Login;
