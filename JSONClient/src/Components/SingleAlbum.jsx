import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleAlbum() {
    const { id } = useParams();

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPhotoId, setEditingPhotoId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [addingPhoto, setAddingPhoto] = useState(false);

    const newPhotoTitle = useRef('');
    const newPhotoUrl = useRef('');
    const newPhotoThumbnail = useRef('');

    const pageRef = useRef(1); // Track current page for pagination

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/photos?albumId=${id}`);
            console.log(response.data);
            setPhotos(response.data);
            setLoading(false);
        };
        fetchPhotos();
    }, [id]);

    const handleEditClick = (photo) => {
        setEditingPhotoId(photo.id);
        setEditedTitle(photo.title);
        setEditedUrl(photo.thumbnailUrl);
    };

    const handleSaveClick = async (photoId) => {
        try {
            const updatedPhoto = { title: editedTitle, thumbnailUrl: editedUrl };
            await axios.patch(`http://localhost:3000/photos/${photoId}`, updatedPhoto);

            setPhotos((prevPhotos) =>
                prevPhotos.map((photo) =>
                    photo.id === photoId ? { ...photo, ...updatedPhoto } : photo
                )
            );

            setEditingPhotoId(null);
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    };

    const handleDeleteClick = async (photoId) => {
        try {
            await axios.delete(`http://localhost:3000/photos/${photoId}`);
            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    const handleAddPhoto = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/photos`);
            const existingPhotos = response.data;
            const largestPhotosId = existingPhotos.reduce((maxId, photo) => {
              return parseInt(photo.id) > maxId ? parseInt(photo.id) : maxId;
            }, 0);

            const newPhoto = {
                albumId: id,
                id: String(largestPhotosId + 1),
                title: newPhotoTitle.current.value,
                url: newPhotoUrl.current.value,
                thumbnailUrl: newPhotoThumbnail.current.value,
            };

            const addedPhoto = await axios.post('http://localhost:3000/photos', newPhoto);
            setPhotos((prevPhotos) => [...prevPhotos, addedPhoto.data]);
            setAddingPhoto(false);
        } catch (error) {
            console.error('Error adding photo:', error);
        }
    }

    return (
        <div>
            <h2>Album Details</h2>
            {!addingPhoto &&
                <button onClick={() => setAddingPhoto(true)}>Add New Photo</button>}
            {addingPhoto &&
                <div>
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
                    <button onClick={() => setAddingPhoto(false)}>Cancel</button>
                </div>
            }
            <ul>
                {photos.map((photo, index) => (
                    <li key={index}>
                        {editingPhotoId === photo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editedUrl}
                                    onChange={(e) => setEditedUrl(e.target.value)}
                                />
                                <button onClick={() => handleSaveClick(photo.id)}>Save</button>
                                <button onClick={() => setEditingPhotoId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <p>{photo.title}</p>
                                <button onClick={() => handleEditClick(photo)}>Edit</button>
                                <button onClick={() => handleDeleteClick(photo.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more photos...</p>}
        </div>
    );
}

export default SingleAlbum;


// import {React, useState, useRef, useEffect} from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function SingleAlbum() {
//     const { id } = useParams();

//     const [photos, setPhotos] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const pageRef = useRef(1); // Track current page for pagination

//     useEffect(() => {
//         const fetchPhotos = async () => {
//             setLoading(true);
//             const response = await axios.get(`http://localhost:3000/photos?albumId=${id}`);
//             console.log(response.data);
//             setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
//             setLoading(false);
//         };
//         fetchPhotos();
//     }, [id]);

//     // Function to handle adding a new photo (similar logic to adding a new album)
//     // Function to handle editing a photo
//     // Function to handle removing a photo
//     // Infinite scroll logic

//     return (
//         <div>
//             <h2>Album Details</h2>
//             <ul>
//                 {photos.map((photo, index)=> (
//                     <li key={index}>
//                         <img src={photo.thumbnailUrl} alt={photo.title} />
//                         <p>{photo.title}</p>
//                     </li>
//                 ))}
//             </ul>
//             {loading && <p>Loading more photos...</p>}
//         </div>
//     );
// }

// export default SingleAlbum

