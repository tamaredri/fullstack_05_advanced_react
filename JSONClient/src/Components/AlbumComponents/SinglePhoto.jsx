import React, { useState, useRef } from 'react';

import classes from '../../modules_css/Photo.module.css'


const SinglePhotos = ({
  photo,
  isEditable,
  setEditingPhotoId

}) => {

  const editedTitle = useRef('');
  const editedUrl = useRef('');
  const [error, setError] = useState('');

  const handleSaveClick = async (photoId) => {
    try {
      const updatedPhoto = {};
      if ( editedUrl.current.value != '' ){
        updatedPhoto.thumbnailUrl = editedUrl.current.value;
      }

      if ( editedTitle.current.value != '' ){
        updatedPhoto.title = editedTitle.current.value;
      }
      const response = await fetch(`http://localhost:3000/photos/${photoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPhoto),
      });
      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
      }
      setEditingPhotoId(null);
    } catch (error) {
      setError('Error updating photo:', error);
    }
  };

  const handleDeleteClick = async (photoId) => {
    try {
      const response = await fetch(`http://localhost:3000/photos/${photoId}`, {
        method: 'DELETE',
      });
    
      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
      }
      setEditingPhotoId(photoId);
    } catch (error) {
      setError('Error deleting photo:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <li className={classes.gridItem}>
      {isEditable ? (
        <div className={classes.editContainer}>
          <input
            type="text"
            ref={editedTitle}
            placeholder='title'
          />
          <input
            type="text"
            ref={editedUrl}
            placeholder='thumbnail'
          />
          <button onClick={() => handleSaveClick(photo.id)}>Save</button>
          <button onClick={() => setEditingPhotoId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={photo.thumbnailUrl} alt={photo.title} />

          <p>{photo.title}</p>

        <div className={classes.buttonHolder}>
          <button onClick={() => setEditingPhotoId(photo.id)}>Edit</button>
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
        </div>
        </div>
      )}
    </li>
  );
}

export default SinglePhotos;
