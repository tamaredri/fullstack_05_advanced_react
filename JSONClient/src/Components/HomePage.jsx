import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NewPost from './NewPost';
import ListPosts from './ListPosts';
import Albums from './Albums';
import Todos from './Todos';
import Info from './Info';

const HomePage = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetch(`http://localhost:3000/users?username=${username}`)
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
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/todos">Todos</Link></li>
            <li><Link to="/info">Info</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/posts/*" element={<PostsRoutes />} />
          <Route path="/albums/*" element={<Albums />} />
          <Route path="/todos/*" element={<Todos />} />
          <Route path="/info" element={<Info />} />
          <Route path="/" element={<DefaultPage />} />
        </Routes>
      </main>
    </div>
  );
};

const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPosts />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
};

const DefaultPage = () => {
  return (
    <div>
      <h2>Welcome to the Application</h2>
      <p>Choose an option from the navigation above.</p>
    </div>
  );
};

export default HomePage;



/*import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NewPost from './NewPost';
import ListPosts from './ListPosts';
import Albums from './Albums';
import Todos from './Todos';
import Info from './Info';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Application Header</h1>
        <nav>
          <ul>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/todos">Todos</Link></li>
            <li><Link to="/info">Info</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/*" element={<PostsRoutes />} />
          <Route path="/albums/*" element={<Albums />} />
          <Route path="/todos/*" element={<Todos />} />
          <Route path="/info" element={<Info />} />
          <Route path="/" element={<DefaultPage />} />
        </Routes>
      </main>
    </div>
  );
};

const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPosts />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
};

const DefaultPage = () => {
  return (
    <div>
      <h2>Welcome to the Application</h2>
      <p>Choose an option from the navigation above.</p>
    </div>
  );
};

export default HomePage;
*/