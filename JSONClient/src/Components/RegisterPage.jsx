import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Perform your registration logic here
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    // Simulated registration success
    localStorage.setItem('user', JSON.stringify({ username: username, fullName: 'New User' }));
    // Redirect to complete profile page or home page
    window.location.href = '/complete-profile'; // Example: Redirect to complete profile page
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Verify Password:</label>
          <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;
