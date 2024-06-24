import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddPhoto from './AddPhoto';
import SinglePhotos from './SinglePhoto';
import classes from '../../modules_css/Photo.module.css'


function PhotosList() {
    const { id } = useParams();

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingPhotoId, setEditingPhotoId] = useState(null);
    const [addingPhoto, setAddingPhoto] = useState(false);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPhotos = async (pageLimit) => {
            setLoading(true);
            let allPhotos = [];
            for (let i = 1; i <= pageLimit; i++) {
                const response = await fetch(`http://localhost:3000/photos?albumId=${id}&_page=${i}&_limit=5`);
                if (!response.ok) {
                    setError(`HTTP error! Status: ${response.status}`);
                  }
                
                  const data = await response.json();
                allPhotos = [...allPhotos, ...data];
            }
            setPhotos(allPhotos);
            setLoading(false);
        };

        fetchPhotos(page);
    }, [id, page, addingPhoto, editingPhotoId]);

    const loadMorePhotos = () => {
        setPage(prevPage => prevPage + 1);
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Album Details</h2>

            <AddPhoto
                addingPhoto={addingPhoto}
                isAddingPhoto={setAddingPhoto}
                albumId={id} />

            <ul className={classes.gridContainer}>
                {photos.map((photo, index) => (
                    <SinglePhotos key={index}
                        photo={photo}
                        isEditable={editingPhotoId === photo.id}
                        setEditingPhotoId={setEditingPhotoId} />
                ))}
            </ul>

            {loading && <p>Loading more photos...</p>}
            <button onClick={loadMorePhotos}>Load More Photos</button>
        </div>
    );
}

export default PhotosList;
