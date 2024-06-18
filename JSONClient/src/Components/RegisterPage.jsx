// RegisterPage.js
import React, { useRef, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const username = usernameRef.current.value;

      const users = await axios.get('http://localhost:3000/users');
      const user = users.data.find(user => user.username === username);

      if (user) {
        setError('User already exists');
        return;
      }

      const password = passwordRef.current.value;

      if (password !== verifyPasswordRef.current.value) {
        setError('Passwords do not match');
        return;
      }

      navigate('/register/form', { state: { username: username, password: password } });
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div>
          <label>Username:</label>
          <input type="text" ref={usernameRef} required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        <div>
          <label>Verify Password:</label>
          <input type="password" ref={verifyPasswordRef} required />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Continue</button>
      </form>

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;
