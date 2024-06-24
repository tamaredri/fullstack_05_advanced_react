import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../Modal.jsx';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });
  const [editingPost, setEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [error, setError] = useState('');
  const [editedComment, setEditedComment] = useState(null); // Track currently edited comment

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setEditedTitle(data.title);
          setEditedBody(data.body);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments?postId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.map(comment => ({ ...comment, editing: false })));
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchAllComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments`);
        if (response.ok) {
          const data = await response.json();
          setAllComments(data);
        } else {
          console.error('Failed to fetch all comments');
        }
      } catch (error) {
        console.error('Error fetching all comments:', error);
      }
    };

    fetchPost();
    fetchComments();
    fetchAllComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.body.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const maxId = Math.max(...allComments.map(comment => comment.id), 0);

    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: parseInt(id),
          id: String(maxId + 1),
          name: newComment.name,
          email: newComment.email,
          body: newComment.body
        })
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data]);
        setNewComment({ name: '', email: '', body: '' }); // Reset input fields
        setError('');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (commentId, newData) => {
    const { name, email, body } = newData;
    try {
      const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, body })
      });
      if (response.ok) {
        setComments(comments.map(comment =>
          comment.id === commentId ? { ...comment, ...newData, editing: false } : comment
        ));
        setEditedComment(null);
      } else {
        console.error('Failed to edit comment');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedComment(null);
  };

  const handleEditButtonClick = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    setEditedComment(commentToEdit);
  };

  const handleSavePost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editedTitle,
          body: editedBody
        })
      });
      if (response.ok) {
        setPost({ ...post, title: editedTitle, body: editedBody });
        setEditingPost(false);
      } else {
        console.error('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
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
