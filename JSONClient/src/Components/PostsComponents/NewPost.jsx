import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal.jsx';

const NewPost = () => {
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
    await axios.post('http://localhost:3000/posts', {
      userId: user,
      id: String(maxId + 1),
      title,
      body
    });

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

/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleCreatePost = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    await axios.post('http://localhost:3000/posts', {
      userId: user.id,
      title,
      body
    });

    navigate('/homePage/posts');
  };

  return (
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
  );
};

export default NewPost;*/

/*import React, { useState } from 'react';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCreatePost = () => {
    // Perform your create post logic here, e.g., validate input fields
    if (!title.trim() || !body.trim()) {
      setError('Please fill in all fields');
      return;
    }
    // Simulated post creation success
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Redirect to posts list or home page
      window.location.href = '/posts'; // Example: Redirect to posts list
    }, 2000);
  };

  return (
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
        {success && <p>Post created successfully!</p>}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPost;*/
