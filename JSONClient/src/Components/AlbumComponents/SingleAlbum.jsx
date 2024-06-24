import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from '../../modules_css/Albums.module.css'

const SingleAlbum = ({ albums, onDeleteAlbum }) => {
  const [error, setError] = useState('');
  const handleDeleteAlbum = async (albumId) => {
    try {
      const response = await fetch(`http://localhost:3000/photos?albumId=${albumId}`);
      if (!response.ok) {
        setError('Network response was not ok');
      }
      const photosResponse = await response.json();
      const photoIds = photosResponse.map(photo => photo.id);

      await Promise.all(photoIds.map(photoId =>
        fetch(`http://localhost:3000/photos/${photoId}`, {
          method: 'DELETE'
        })
      ));
      

      await onDeleteAlbum(albumId);

    } catch (error) {
      setError('Error deleting album and photos:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
}

  return (
    <li>
      <button onClick={() => handleDeleteAlbum(album.id)}>🗑️</button>

      <Link to={`/homePage/albums/${album.id}`}>
        {album.id} - {album.title}
      </Link>
    </li>
  );
}

export default SingleAlbum;
