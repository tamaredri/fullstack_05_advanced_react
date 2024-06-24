import React, { useState, useRef } from 'react';
import axios from 'axios';

const CommentForm = ({ comments, setComments, postId }) => {
  const [error, setError] = useState('');
  const nameRef = useRef('');
  const emailRef = useRef('');
  const bodyRef = useRef('');

  const handleAddComment = async () => {
    if (!nameRef.current.trim() || !emailRef.current.trim() || !bodyRef.current.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const maxId = Math.max(...comments.map(comment => comment.id), 0);

    const response = await axios.post(`http://localhost:3000/comments`, {
      postId: parseInt(postId),
      id: maxId + 1,
      name: nameRef.current,
      email: emailRef.current,
      body: bodyRef.current
    });

    setComments([...comments, response.data]);
    nameRef.current = '';
    emailRef.current = '';
    bodyRef.current = '';
    setError('');
  };

  return (
    <div>
      <input
        type="text"
        ref={nameRef}
        placeholder="Name"
      />
      <input
        type="email"
        ref={emailRef}
        placeholder="Email"
      />
      <input
        type="text"
        ref={bodyRef}
        placeholder="Comment Body"
      />
      <button onClick={handleAddComment}>Add Comment</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CommentForm;
