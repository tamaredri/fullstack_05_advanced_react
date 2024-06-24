import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SingleAlbum = ({ album, onDeleteAlbum }) => {
  const handleDeleteAlbum = async (albumId) => {
    try {
      const photosResponse = await axios.get(`http://localhost:3000/photos?albumId=${albumId}`);
      const photoIds = photosResponse.data.map(photo => photo.id);

      await Promise.all(photoIds.map(photoId =>
        axios.delete(`http://localhost:3000/photos/${photoId}`)
      ));

      await onDeleteAlbum(albumId);

    } catch (error) {
      console.error('Error deleting album and photos:', error);
    }
  };

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
