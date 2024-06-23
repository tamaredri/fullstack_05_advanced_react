import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import classes from '../../modules_css/Home.module.css'

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
    <header className={classes.header}>
      <div className={classes.headerTop}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={onLogout}>Logout</button>
      </div>

      <nav>
        <ul className={classes.navList}>
          <li><Link to="/homePage/">Home</Link></li>
          <li><Link to="/homePage/posts">Posts</Link></li>
          <li><Link to="/homePage/albums">Albums</Link></li>
          <li><Link to="/homePage/todos">Todos</Link></li>
          <li><Link to="/homePage/info">Info</Link></li>
        </ul>
      </nav>
    </header>
  );
};



export default HomePage;
