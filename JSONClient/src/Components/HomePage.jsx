import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const HomePage = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      fetch(`http://localhost:3000/users?id=${user}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setUser(data[0]);
          }
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <h1>Welcome, {user.name}</h1>
        <button onClick={onLogout}>Logout</button>
        <nav>
          <ul>
            <li><Link to="/homePage/">Home</Link></li>
            <li><Link to="/homePage/posts">Posts</Link></li>
            <li><Link to="/homePage/albums">Albums</Link></li>
            <li><Link to="/homePage/todos">Todos</Link></li>
            <li><Link to="/homePage/info">Info</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};



export default HomePage;
