import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Albums = () => {
  const newAlbumName = useRef('');
  const [albums, setAlbums] = useState([]);
  const [addingAlbum, setAddingAlbum] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      const user =localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/albums?userId=${user}`);
      setAlbums(response.data);
    };
    fetchAlbums();
  }, [addingAlbum]);

  const handleAddAlbum = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.get(`http://localhost:3000/albums`);
      const existingAlbums = response.data;
      const largestAlbumId = existingAlbums.reduce((maxId, album) => {
        return parseInt(album.id) > maxId ? parseInt(album.id) : maxId;
      }, 0);

      const newAlbum = {
        userId: user,
        id: String(largestAlbumId + 1),
        title: newAlbumName.current.value
      };

      const addAlbumResponse = await axios.post('http://localhost:3000/albums', newAlbum);

      setAlbums(prevAlbums => [...prevAlbums, addAlbumResponse.data]);
      setAddingAlbum(false);
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      const photosResponse = await axios.get(`http://localhost:3000/photos?albumId=${albumId}`);
      const photoIds = photosResponse.data.map(photo => photo.id);
      console.log(photoIds);
      
      await Promise.all(photoIds.map(photoId =>
        axios.delete(`http://localhost:3000/photos/${photoId}`)
      ));

      await axios.delete(`http://localhost:3000/albums/${albumId}`);

      setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
    } catch (error) {
      console.error('Error deleting album and photos:', error);
    }
  };

  return (
    <div>
      <h2>Albums</h2>

      {!addingAlbum ? (
        <button onClick={() => setAddingAlbum(true)}>Add New Album</button>
      ) : (
        <div>
          <input type="text" ref={newAlbumName}/>
          <button onClick={handleAddAlbum}>Create Album</button>
          <button onClick={() => setAddingAlbum(false)}>Cancel</button>
        </div>
      )}

      <ul>
        {albums.map((album, index) => (
          <li key={index} >
            <Link to={`/homePage/albums/${album.id}`}>
              {album.id}, {album.title}
            </Link>
            <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;