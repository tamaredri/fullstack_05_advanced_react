import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SingleAlbum = ({ albums, onDeleteAlbum }) => {
  const handleDeleteAlbum = async (albumId) => {
    try {
      const photosResponse = await axios.get(`http://localhost:3000/photos?albumId=${albumId}`);
      const photoIds = photosResponse.data.map(photo => photo.id);

      await Promise.all(photoIds.map(photoId =>
        axios.delete(`http://localhost:3000/photos/${photoId}`)
      ));

      await onDeleteAlbum(albumId); // Call onDeleteAlbum callback from props

    } catch (error) {
      console.error('Error deleting album and photos:', error);
    }
  };

  return (
    <div>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <Link to={`/homePage/albums/${album.id}`}>
              {album.id}, {album.title}
            </Link>
            <button onClick={() => handleDeleteAlbum(album.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleAlbum;
