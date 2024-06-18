import React, { useState } from 'react';

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

export default NewPost;
