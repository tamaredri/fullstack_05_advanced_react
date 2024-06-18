import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:3000/albums?userId=${user.id}`);
      setAlbums(response.data);
    };
    fetchAlbums();
  }, []);

  const handleAlbumClick = async (albumId) => {
    setLoading(true);
    setSelectedAlbum(albumId);
    const response = await axios.get(`http://localhost:3000/albums/${albumId}/photos`);
    setPhotos(response.data);
    setLoading(false);
  };

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)}>
            {album.id}, {album.title}
          </li>
        ))}
      </ul>
      {loading && <p>Loading photos...</p>}
      {selectedAlbum && !loading && (
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

export default Albums;
