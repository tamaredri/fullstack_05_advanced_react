import React, { useRef, useEffect } from 'react';

import classes from '../../modules_css/Posts.module.css';


const EditCommentForm = ({ 
  comment, 
  isEditable, 
  isInEdit, 
  setEdittingId,
  setInDelete
}) => {

  const name = useRef(comment.name);
  //const email = useRef(comment.email);
  const body = useRef(comment.body);


  useEffect(() => {
    if (isInEdit) {
      name.current.value = comment.name;
      //email.current.value = comment.email;
      body.current.value = comment.body;
    }
  }, [isInEdit]);

  const handleEditComment = async () => {

    try {
      const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.current.value,
          email: comment.email,
          body: body.current.value,
        })
      });

      if (response.ok) {
        setEdittingId(null);
      } else {
        console.error('Failed to edit comment');
      }

    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      setInDelete(true);
      const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setInDelete(false);
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };



  return (
    <li className={classes.commentItem}>
      {isInEdit ? (
        <div className={classes.postData}>
          <label>Name:</label>
          <input
            type="text"
            ref={name}
          />

          <label>Body:</label>
          <textarea
            ref={body}
          />

          <button onClick={() => handleEditComment()}>Save</button>
          <button onClick={() => setEdittingId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h5>{comment.email} : </h5>

          <strong>{comment.name}</strong>
          <p>{comment.body}</p>

          {isEditable && 
            <button onClick={() => setEdittingId(comment.id)}>Edit</button>
          }

          {isEditable && (
            <button onClick={() => handleDeleteComment()}>Delete</button>
          )}
        </div>
      )}
    </li>
  );
};

export default EditCommentForm;
