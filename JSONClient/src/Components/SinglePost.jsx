import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
    };

    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3000/posts/${id}/comments`);
      setComments(response.data);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`http://localhost:3000/posts/${id}/comments`, {
      userId: user.id,
      body: newComment
    });
    setComments([...comments, response.data]);
    setNewComment('');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="New comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default SinglePost;
