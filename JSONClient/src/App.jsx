import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      return true;
    } else {
      return false;
    }
  });
  const navigate = useNavigate();

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    navigate('/homePage', {replace: true});
  };

  const handleRegister = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    navigate('/homePage', {replace: true});
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login', {replace: true});
  };

  return (
      <>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
            <Route path="/homePage" element={<HomePage onLogout={handleLogout}  />} />
            <Route path="/" element={isLoggedIn === true? <Navigate to="/homePage" replace={true} /> : <Navigate to="/login" replace={true}/>} />
          </Routes>
      </>
  );
};

export default App;
