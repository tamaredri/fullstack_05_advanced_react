import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';

const NewPost = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:3000/posts`);
      const ids = response.data.map(post => parseInt(post.id));
      if (ids.length > 0) {
        setMaxId(Math.max(...ids));
      } else {
        setMaxId(0);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const user = localStorage.getItem('user');
    const newPost = {
      userId: user,
      id: String(maxId + 1),
      title,
      body
    };

    const response = await axios.post('http://localhost:3000/posts', newPost);
    onNewPost(response.data);
    navigate('/homePage/posts');
  };

  return (
    <Modal>
      <div>
        <h2>New Post</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Body:</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Create Post</button>
        </form>
      </div>
    </Modal>
  );
};

export default NewPost;
