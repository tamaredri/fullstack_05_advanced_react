import React, { useRef } from 'react';
import axios from 'axios';

import classes from '../../modules_css/Photo.module.css'

const AddPhoto = ({addingPhoto, isAddingPhoto, albumId}) => {
    const newPhotoTitle = useRef('');
    const newPhotoUrl = useRef('');
    const newPhotoThumbnail = useRef('');

    const handleAddPhoto = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/photos`);
            const existingPhotos = response.data;
            const largestPhotosId = existingPhotos.reduce((maxId, photo) => {
              return parseInt(photo.id) > maxId ? parseInt(photo.id) : maxId;
            }, 0);

            const newPhoto = {
                albumId: albumId,
                id: String(largestPhotosId + 1),
                title: newPhotoTitle.current.value,
                url: newPhotoUrl.current.value,
                thumbnailUrl: newPhotoThumbnail.current.value,
            };

            const addedPhoto = await axios.post('http://localhost:3000/photos', newPhoto);
            isAddingPhoto(false);
        } catch (error) {
            console.error('Error adding photo:', error);
        }
    }


    return (
        <div>
            {!addingPhoto &&
                <button onClick={() => isAddingPhoto(true)}>Add New Photo</button>}
            {addingPhoto &&
                <div className={classes.add}>
                    <h3>Add New Photo</h3>
                    <input
                        type="text"
                        placeholder="Photo Title"
                        ref={newPhotoTitle}
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        ref={newPhotoUrl}
                    />
                    <input
                        type="text"
                        placeholder="Photo Thumbnail"
                        ref={newPhotoThumbnail}
                    />
                    <button onClick={() => handleAddPhoto()}>Add Photo</button>
                    <button onClick={() => isAddingPhoto(false)}>Cancel</button>
                </div>
            }
        </div>
    );
}

export default AddPhoto;
