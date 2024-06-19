import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleAlbum() {
    const { id } = useParams();

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPhotoId, setEditingPhotoId] = useState(null); // Track which photo is being edited
    const [newPhotoTitle, setNewPhotoTitle] = useState(''); // For adding new photo title

    const pageRef = useRef(1); // Track current page for pagination

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/photos?albumId=${id}`);
            console.log(response.data)
            setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
            setLoading(false);
        };
        fetchPhotos();
    }, [id]); // Fetch photos when id changes

    // Function to handle editing a photo
    const handleEditPhoto = async (photoId) => {
        try {
            // Make API call to update photo title
            await axios.patch(`http://localhost:3000/photos/${photoId}`, { title: photos.find(photo => photo.id === photoId).title });
            setEditingPhotoId(null); // Exit editing mode
        } catch (error) {
            console.error('Error editing photo:', error);
        }
    };

    // Function to handle removing a photo
    const handleRemovePhoto = async (photoId) => {
        try {
            // Make API call to delete photo
            await axios.delete(`http://localhost:3000/photos/${photoId}`);
            setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    // // Infinite scroll logic to load more photos
    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    //     ) {
    //         // Reached bottom of page, load more photos
    //         pageRef.current++;
    //         //fetchPhotos();
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []); // Add scroll event listener on component mount

    // Render function for photo items
    const renderPhotoItem = (photo, index) => {
        if (editingPhotoId === photo.id) {
            // Render edit mode
            return (
                <li key={index}>
                    <input
                        type="text"
                        value={photos.find(p => p.id === photo.id).title}
                        onChange={(e) => setNewPhotoTitle(e.target.value)}
                    />
                    <button onClick={() => handleEditPhoto(photo.id)}>Save</button>
                    <button onClick={() => setEditingPhotoId(null)}>Cancel</button>
                </li>
            );
        } else {
            // Render view mode
            return (
                <li key={index}>
                    <p>{photo.title}</p>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                    <button onClick={() => setEditingPhotoId(photo.id)}>Edit</button>
                    <button onClick={() => handleRemovePhoto(photo.id)}>Delete</button>
                </li>
            );
        }
    };

    return (
        <div>
            <h2>Album Details</h2>
            <ul>
                {photos.map((photo, index) => renderPhotoItem(photo, index))}
            </ul>
            {loading && <p>Loading more photos...</p>}
        </div>
    );
}

export default SingleAlbum;
