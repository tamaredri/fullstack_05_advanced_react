import {React, useState, useRef, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleAlbum() {
    const { id } = useParams();

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const pageRef = useRef(1); // Track current page for pagination

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:3000/photos?albumId=${id}&userId=${user}`);
            console.log(response.data.length)
            setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
            setLoading(false);
        };
        fetchPhotos();
    }, []);

    // Function to handle adding a new photo (similar logic to adding a new album)
    // Function to handle editing a photo
    // Function to handle removing a photo
    // Infinite scroll logic

    return (
        <div>
            <h2>Album Details</h2>
            <ul>
                {photos.map((photo, index)=> (
                    <li key={index}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <p>{photo.title}</p>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading more photos...</p>}
        </div>
    );
}

export default SingleAlbum

