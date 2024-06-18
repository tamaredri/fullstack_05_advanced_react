import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInRegister, setIsInRegister] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleRegister = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
      <>
        {/* <div>
        </div> */}
        <Router>
          {!isLoggedIn && !isInRegister && <Navigate to="/login" replace={true} />}
          {!isLoggedIn && isInRegister && <Navigate to="/register" replace={true} />}
          {isLoggedIn && <Navigate to="/homePage" replace={true} />}
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
            <Route path="/homePage" element={<HomePage onLogout={handleLogout}  />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </>
  );
};

export default App;

/*

    <Router>
      <div>
        {!isLoggedIn && <Navigate to="/login" replace={true} />}
        {isLoggedIn && (
          <>
            <nav>
              <ul>
                <li><Link to="/homePage">Home</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/homePage" element={<HomePage username={username} />} />
            </Routes>
          </>
        )}
        <Routes>
          <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
        </Routes>
      </div>
    </Router>
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

const App = () => {
  const [view, setView] = useState('login');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setView('home');
    }
  }, []);

  const handleLogin = () => {
    setView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setView('login');
  };

  return (
    <>
    <Router>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
      <Route path="/login" element={<HomePage onLogout={handleLogout}  />} />
    </Router>
    </>
  );
};

export default App;
*/

/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

const App = () => {
  const [view, setView] = useState('login'); // Initial view is 'login'

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${view}`} />} />
        <Route path="/login" element={<LoginPage onLogin={() => setView('home')} />} />
        <Route path="/register" element={<RegisterPage onRegister={() => setView('home')} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
*/
/*
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import HomePage from './Components/HomePage';

 const App = () => {
   return (
     <Router>
       <Routes>
         <Route path="*" element={<HomePage />} />
       </Routes>
     </Router>
   );
 };

 export default App;
*/

/*import { useState } from 'react'
import './App.css'
import HomePage from'./Components/HomePage'

function App() {
  fetch('http://localhost:3000/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));
  return (
    <>
      <HomePage/>
    </>
  )
}

export default App*/
