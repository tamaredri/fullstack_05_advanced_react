import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal.jsx';

const NewPost = ({ setIsAddingPost }) => {
  const title = useRef('');
  const body = useRef('');
  const maxId = useRef(0);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaxId = async () => {

      const response = await axios.get(`http://localhost:3000/posts`);
      
      const ids = response.data.map(post => parseInt(post.id));
      if (ids.length > 0) {
        maxId.current = Math.max(...ids);
      }
    };
    fetchMaxId();
  }, []);

  const handleCreatePost = async () => {
    setIsAddingPost(false);

    if (!title.current.value.trim() || !body.current.value.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const user = localStorage.getItem('user');
    const newPost = {
      userId: user,
      id: String(maxId.current + 1),
      title: title.current.value,
      body: body.current.value,
    };

    const response = await axios.post('http://localhost:3000/posts', newPost);

    setIsAddingPost(true);
    navigate('/homePage/posts');
  };

  return (
    <Modal>
        <h2>New Post</h2>

        <form 
        onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}>

          <div>
            <label>Title:</label>
            <input type="text" ref={title} />
          </div>

          <div>
            <label>Body:</label>
            <textarea ref={body}/>
          </div>

          {error && <p>{error}</p>}

          <button type="submit">Create Post</button>
        </form>

    </Modal>
  );
};

export default NewPost;
