import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../../modules_css/Login.module.css'


const RegisterPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const username = usernameRef.current.value;

      const response = await fetch('http://localhost:3000/users');
  
      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
      }
      const users = await response.json();
      const user = users.find(user => user.username === username);

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
    <div className={classes.loginCard}>
      <h2 className={classes.headline}>Register Page</h2>

      <form className={classes.form} onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>

        <input
          type="text"
          ref={usernameRef}
          placeholder="Username"
          required />

        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required />

        <input
          type="password"
          ref={verifyPasswordRef}
          placeholder="Verify Password"
          required />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Continue</button>
      </form>

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;
