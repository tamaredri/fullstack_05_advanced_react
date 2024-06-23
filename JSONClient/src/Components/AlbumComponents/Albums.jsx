import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classes from '../../modules_css/Home.module.css'
import AddAlbum from './AddAlbum.jsx';
import FilterAlbums from './FilterAlbums.jsx';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  const [addingAlbum, setAddingAlbum] = useState(false);
  const [filterring, setFilterring] = useState(false);


  useEffect(() => {
    const fetchAlbums = async () => {
      const user = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/albums?userId=${user}`);
      setAlbums(response.data);
    };
    fetchAlbums();
  }, [addingAlbum]);

  useEffect(() => {
    // filter
  }, [])

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

  // const filteredAlbums = albums.filter(album => {
  //   if (searchCriterion === 'serial') {
  //     return album.id.toString().includes(searchQuery);
  //   } else if (searchCriterion === 'title') {
  //     return album.title.toLowerCase().includes(searchQuery.toLowerCase());
  //   }
  //   return true;
  // });

  return (
    <div className={classes.displayCard}>
      
      <h2>Albums</h2>

      <FilterAlbums />

      <AddAlbum
        setAddingAlbum={setAddingAlbum}
        isAddingAlbum={addingAlbum} />

      <ul>
        {/* {filteredAlbums.map((album, index) => (
          <li key={index}>
            <Link to={`/homePage/albums/${album.id}`}>
              {album.id}, {album.title}
            </Link>
            <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Albums;