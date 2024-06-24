import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddAlbum from './AddAlbum.jsx';
import Filterring from '../Filterring.jsx';
import SingleAlbum from './SingleAlbum.jsx';

import classes from '../../modules_css/Albums.module.css'

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [addingAlbum, setAddingAlbum] = useState(false);
  const [filteringMethod, setFilterringMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      let filterQuery = '';

      if (filteringMethod && searchQuery) {
        filterQuery = `&${filteringMethod}_like=${searchQuery}`;
      }

      const user = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/albums?userId=${user}${filterQuery}`);
      setAlbums(response.data);
    };

    fetchAlbums();
  }, [searchQuery, filteringMethod, addingAlbum]);

  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(`http://localhost:3000/albums/${albumId}`);
      setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div >
      <h2>Albums</h2>

      <AddAlbum
        setAddingAlbum={setAddingAlbum}
        isAddingAlbum={addingAlbum}
      />

      <div className={classes.divider}></div>

      <Filterring
        setFilterringMethod={setFilterringMethod}
        setSearchQuery={setSearchQuery}
      />

      <div className={classes.divider}></div>

      <ul className={classes.albumList}>
        {albums.map((album, index) => (
          <SingleAlbum
            key={index}
            album={album}
            onDeleteAlbum={handleDeleteAlbum}
          />
        ))}
      </ul>
    </div>
  );
};

export default Albums;
