import React, { useState, useEffect } from 'react';
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
