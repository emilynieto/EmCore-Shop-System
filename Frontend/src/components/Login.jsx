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
            onChange=
          />
        </div>
      </div>
    </>
  );
}

export default Login;
