import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';

import classes from '../../modules_css/Posts.module.css';


const NewPost = ({ setIsAddingPost }) => {
  const title = useRef('');
  const body = useRef('');
  const maxId = useRef(0);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaxId = async () => {

      const response = await fetch(`http://localhost:3000/posts`);
      if (!response.ok) {
        setError('Network response was not ok');
      }
      const data = await response.json();
      const ids = data.map(post => parseInt(post.id));
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

    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
    if (!response.ok) {
      setError('Network response was not ok, can not add this post');
    }
    setIsAddingPost(true);
    navigate('/homePage/posts');
  };

  return (
    <Modal>
      <h2>New Post</h2>

      <div className={classes.postData}>
        <form
          onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}>

          <div>
            <label>Title:</label>
            <input type="text" ref={title} />
          </div>

          <div>
            <label>Body:</label>
            <textarea ref={body} />
          </div>

          {error && <p className={classes.error}>{error}</p>}

          <button type="submit">Create Post</button>
        </form>
      </div>


    </Modal>
  );
};

export default NewPost;
