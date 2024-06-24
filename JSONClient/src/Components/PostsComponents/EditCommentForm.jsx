import React, { useState } from 'react';

const EditCommentForm = ({ comment, handleEditComment, handleCancelEdit }) => {
  const [editedComment, setEditedComment] = useState(comment);

  return (
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
  );
};

export default EditCommentForm;
