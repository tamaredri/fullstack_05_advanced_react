import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from '../../modules_css/Albums.module.css'

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
      <ul className={classes.albumList}>
        {albums.map((album, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteAlbum(album.id)}>🗑️</button>
           
            <Link className={classes.link} to={`/homePage/albums/${album.id}`}>
              {album.id}, {album.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleAlbum;
