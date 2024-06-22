import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from '../modules_css/Login.module.css'

const LoginPage = ({ onLogin }) => {
  const [error, setError] = useState('');
  const username = useRef('');
  const password = useRef('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const u = username.current.value;
    const p = password.current.value;

    try {
      const users = await axios.get(`http://localhost:3000/users`);
      const user = users.data.find(user => user.username === u && user.website === p);
      if (user) {
        onLogin(user.id);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    }
  };

  return (
    <div className={classes.loginCard}>
      <h2 className={classes.headline}>Login Page</h2>

      <form className={classes.form} onSubmit={handleLogin}>

        <input
          type="text"
          ref={username}
          placeholder="Username"
          required
        />

        <input
          type="password"
          ref={password}
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

