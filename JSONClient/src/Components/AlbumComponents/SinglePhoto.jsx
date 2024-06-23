import React, { useRef } from 'react';
import axios from 'axios';

const SinglePhotos = ({
  photo,
  isEditable,
  setEditingPhotoId

}) => {

  const editedTitle = useRef('');
  const editedUrl = useRef('');

  const handleSaveClick = async (photoId) => {
    try {
      const updatedPhoto = {};
      if ( editedUrl.current.value != '' ){
        updatedPhoto.thumbnailUrl = editedUrl.current.value;
      }

      if ( editedTitle.current.value != '' ){
        updatedPhoto.title = editedTitle.current.value;
      }

      await axios.patch(`http://localhost:3000/photos/${photoId}`, 
        updatedPhoto);
      setEditingPhotoId(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleDeleteClick = async (photoId) => {
    try {
      await axios.delete(`http://localhost:3000/photos/${photoId}`);
      setEditingPhotoId(photoId);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };


  return (
    <li>
      {isEditable ? (
        <div>
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

          <button onClick={() => setEditingPhotoId(photo.id)}>Edit</button>
          <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}

export default SinglePhotos;
