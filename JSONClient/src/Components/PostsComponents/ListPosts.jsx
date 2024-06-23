import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

import classes from '../../modules_css/Home.module.css'

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('title');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const user = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/posts?userId=${user}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    searchCriterion === 'serial'
      ? post.id.toString().includes(search)
      : post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <label>Search by: </label>
        <select onChange={(e) => setSearchCriterion(e.target.value)} value={searchCriterion}>
          <option value="title">Title</option>
          <option value="serial">Serial Number</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
        />
      </div>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/homePage/posts/${post.id}`}>
              {post.id}, {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('new', { state: { backgroundLocation: location } })}>
        Create New Post
      </button>

      <Outlet />
    </div>
  );
};

export default ListPosts;

/*import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('title');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const user = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/posts?userId=${user}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    searchCriterion === 'serial'
      ? post.id.toString().includes(search)
      : post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <label>Search by: </label>
        <select onChange={(e) => setSearchCriterion(e.target.value)} value={searchCriterion}>
          <option value="title">Title</option>
          <option value="serial">Serial Number</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts"
        />
      </div>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/homePage/posts/${post.id}`}>
              {post.id}, {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/homePage/posts/new')}>Create New Post</button>
    </div>
  );
};

export default ListPosts;*/

/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const user = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/posts?userId=${user}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Posts</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts"
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/posts/new">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};

export default ListPosts;
*/