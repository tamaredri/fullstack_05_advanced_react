import React, { useState, useRef } from 'react';


import classes from '../../modules_css/Albums.module.css'

const AddAlbum = ({ isAddingAlbum, setAddingAlbum }) => {
    const newAlbumName = useRef('');
    const [error, setError] = useState('');

    const handleAddAlbum = async () => {
        try {
            const user = localStorage.getItem('user');
            const response = await fetch(`http://localhost:3000/albums`);
            if (!response.ok) {
            setError('Network response was not ok');
            }
            const existingAlbums = await response.json();
            const largestAlbumId = existingAlbums.reduce((maxId, album) => {
                return parseInt(album.id) > maxId ? parseInt(album.id) : maxId;
            }, 0);

            await fetch('http://localhost:3000/albums', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: user,
                  id: String(largestAlbumId + 1),
                  title: newAlbumName.current.value
                })
              });
              

            setAddingAlbum(false);
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

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
