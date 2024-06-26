import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './Components/EntryComponents/LoginPage';
import Registration from './Routes/RegistrationRoutes';
import HomeRoutes from './Routes/HomeRoutes';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      return true;
    } else {
      return false;
    }
  });

  const navigate = useNavigate();

  const handleLogin = (userID) => {
    localStorage.setItem('user', userID);
    setIsLoggedIn(true);
    navigate('/homePage', {replace: true});
  };

  const handleRegister = (userID) => {
    localStorage.setItem('user', userID);
    setIsLoggedIn(true);
    navigate('/homePage', {replace: true});
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login', {replace: true});
  };

  return (
      <>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register/*" element={<Registration onRegister={handleRegister} />} />
            <Route path="/homePage/*" element={<HomeRoutes onLogout={handleLogout}  />} />
            <Route index element={isLoggedIn === true? <Navigate to="/homePage" replace={true} /> : <Navigate to="/login" replace={true}/>} />
          </Routes>
      </>
  );
};

export default App;
