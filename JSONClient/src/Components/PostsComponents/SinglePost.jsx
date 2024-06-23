import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingPost, setEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      setPost(response.data);
      setEditedTitle(response.data.title);
      setEditedBody(response.data.body);
    };

    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3000/comments?postId=${id}`);
      setComments(response.data);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`http://localhost:3000/comments`, {
      postId: id,
      userId: user,
      body: newComment
    });
    setComments([...comments, response.data]);
    setNewComment('');
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`http://localhost:3000/comments/${commentId}`);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleEditComment = async (commentId, newBody) => {
    await axios.patch(`http://localhost:3000/comments/${commentId}`, { body: newBody });
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, body: newBody } : comment
    ));
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
            {comment.userId === JSON.parse(localStorage.getItem('user')).id ? (
              <input
                type="text"
                value={comment.body}
                onChange={(e) => handleEditComment(comment.id, e.target.value)}
              />
            ) : (
              comment.body
            )}
            {comment.userId === JSON.parse(localStorage.getItem('user')).id && (
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            )}
          </li>
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

/*import React, { useState, useEffect } from 'react';
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
      userId: user,
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

export default SinglePost;*/
