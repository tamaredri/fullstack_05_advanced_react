import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.website === password);

      if (user) {
        onLogin(username);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>If you don't have an account, <Link to="/register">register here</Link>.</p>
    </div>
  );
};

export default LoginPage;


/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.website === password);

      if (user) {
        localStorage.setItem('username', username);
        onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>If you don't have an account, <Link to="/register">register here</Link>.</p>
    </div>
  );
};

export default LoginPage;
*/



/*import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();
      const user = users.find(user => user.username === username && user.website === password);

      if (user) {
        onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
*/