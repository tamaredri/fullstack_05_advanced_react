import React, { useState } from 'react';
import axios from 'axios';
import EditCommentForm from './EditCommentForm.jsx';

const CommentList = ({ comments, setComments, postId }) => {
  const [editedComment, setEditedComment] = useState(null);

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
    setEditedComment(null);
  };

  const handleCancelEdit = () => {
    setEditedComment(null);
  };

  const handleEditButtonClick = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    setEditedComment(commentToEdit);
  };

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          {editedComment && editedComment.id === comment.id ? (
            <EditCommentForm
              comment={editedComment}
              handleEditComment={handleEditComment}
              handleCancelEdit={handleCancelEdit}
            />
          ) : (
            <div>
              <strong>{comment.name}</strong> ({comment.email}) : {comment.body}
              <button onClick={() => handleEditButtonClick(comment.id)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
