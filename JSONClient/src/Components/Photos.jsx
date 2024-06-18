import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:3000/albums?userId=${user.id}`);
      setAlbums(response.data);
    };
    fetchAlbums();
  }, []);

  const handleAlbumClick = async (albumId) => {
    const response = await axios.get(`http://localhost:3000/albums/${albumId}/photos`);
    setPhotos(response.data);
    setSelectedAlbum(albumId);
  };

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)}>
            {album.title}
          </li>
        ))}
      </ul>
      {selectedAlbum && (
        <div>
          <h3>Photos</h3>
          <ul>
            {photos.map(photo => (
              <li key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Photos;
