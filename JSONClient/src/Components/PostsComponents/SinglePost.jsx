import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from '../Modal.jsx';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [allCommants, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });
  const [editingPost, setEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [error, setError] = useState('');
  const [editedComment, setEditedComment] = useState(null); // Track currently edited comment

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
      setEditedTitle(response.data.title);
      setEditedBody(response.data.body);
    };

    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3000/comments?postId=${id}`);
      setComments(response.data.map(comment => ({ ...comment, editing: false })));
    };

    const fetchAllComments = async () => {
      const response = await axios.get(`http://localhost:3000/comments`);
      setAllComments(response.data);
    }
    fetchPost();
    fetchComments();
    fetchAllComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.body.trim()) {
      setError('Please fill in all fields');
      return;
    }
  
    
    const maxId = Math.max(...allCommants.map(comment => comment.id), 0);
  
    const response = await axios.post(`http://localhost:3000/comments`, {
      postId: parseInt(id),
      id: String(maxId + 1),
      name: newComment.name,
      email: newComment.email,
      body: newComment.body
    });
  
    setComments([...comments, response.data]);
    setNewComment({ name: '', email: '', body: '' }); // Reset input fields
    setError('');
  };
  

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`http://localhost:3000/comments/${commentId}`);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleEditComment = async (commentId, newData) => {
    const { name, email, body } = newData;
    await axios.patch(`http://localhost:3000/comments/${commentId}`, { name, email, body });
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, ...newData, editing: false } : comment
    ));
    setEditedComment(null); // Clear edited comment after saving
  };

  const handleCancelEdit = () => {
    setEditedComment(null); // Clear edited comment when canceling
  };

  const handleEditButtonClick = (commentId) => {
    // Find the comment to edit
    const commentToEdit = comments.find(comment => comment.id === commentId);
    setEditedComment(commentToEdit); // Set the comment to be edited
  };

  const handleSavePost = async () => {
    await axios.patch(`http://localhost:3000/posts/${id}`, {
      title: editedTitle,
      body: editedBody
    });
    setPost({ ...post, title: editedTitle, body: editedBody });
    setEditingPost(false);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Modal>
      <div>
        <h2>{editingPost ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          post.title
        )}</h2>
        <p>{editingPost ? (
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          post.body
        )}</p>
        {editingPost ? (
          <button onClick={handleSavePost}>Save</button>
        ) : (
          <button onClick={() => setEditingPost(true)}>Edit Post</button>
        )}
        <h3>Comments</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              {editedComment && editedComment.id === comment.id ? (
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editedComment.name}
                    onChange={(e) => setEditedComment({ ...editedComment, name: e.target.value })}
                  />
                  <label>Email:</label>
                  <input
                    type="text"
                    value={editedComment.email}
                    onChange={(e) => setEditedComment({ ...editedComment, email: e.target.value })}
                  />
                  <label>Body:</label>
                  <textarea
                    value={editedComment.body}
                    onChange={(e) => setEditedComment({ ...editedComment, body: e.target.value })}
                  />
                  <button onClick={() => handleEditComment(comment.id, editedComment)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{comment.name}</strong> ({comment.email}) : {comment.body}
                  {comment.userId === JSON.parse(localStorage.getItem('user')).id && (
                    <button onClick={() => handleEditButtonClick(comment.id)}>Edit</button>
                  )}
                  {comment.userId === JSON.parse(localStorage.getItem('user')).id && (
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={newComment.email}
            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            placeholder="Comment Body"
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>

        {error && <p>{error}</p>}
      </div>
    </Modal>
  );
};

export default SinglePost;

