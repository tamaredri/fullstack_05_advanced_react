import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const ListPosts = ({ posts, setPosts }) => {
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
  }, [setPosts]);

  const filteredPosts = posts.filter(post => 
    searchCriterion === 'serial'
      ? post.id.toString().includes(search)
      : post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeletePost = async (postId) => {
    await axios.delete(`http://localhost:3000/posts/${postId}`);
    setPosts(posts.filter(post => post.id !== postId));
  };

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
            <Link to={`/homePage/posts/${post.id}`} state={{ backgroundLocation: location }}>
              {post.id}, {post.title}
            </Link>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
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
