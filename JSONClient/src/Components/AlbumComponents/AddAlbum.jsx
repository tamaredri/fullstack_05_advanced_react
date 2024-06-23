import React, { useRef } from 'react';
import axios from 'axios';

import classes from '../../modules_css/Albums.module.css'

const AddAlbum = ({ isAddingAlbum, setAddingAlbum }) => {
    const newAlbumName = useRef('');

    const handleAddAlbum = async () => {
        try {
            const user = localStorage.getItem('user');

            // get next running id number
            const response = await axios.get(`http://localhost:3000/albums`);
            const existingAlbums = response.data;
            const largestAlbumId = existingAlbums.reduce((maxId, album) => {
                return parseInt(album.id) > maxId ? parseInt(album.id) : maxId;
            }, 0);

            await axios.post('http://localhost:3000/albums',
                {
                    userId: user,
                    id: String(largestAlbumId + 1),
                    title: newAlbumName.current.value
                }
            );

            setAddingAlbum(false);
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };

    return (
        <div className={classes.flex}>
            {!isAddingAlbum ? (
                <button onClick={() => setAddingAlbum(true)}>Add New Album</button>
            ) : (
                <div className={classes.add}>
                    <input type="text" placeholder='title' ref={newAlbumName} />
                    <button onClick={handleAddAlbum}>Done</button>
                    <button onClick={() => setAddingAlbum(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AddAlbum;
