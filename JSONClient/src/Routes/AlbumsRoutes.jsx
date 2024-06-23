import React from 'react'
import Albums from '../Components/AlbumComponents/Albums'
import PhotosList from '../Components/AlbumComponents/PhotosList';
import { Route, Routes } from 'react-router-dom';

const AlbumsRoutes = () => {
    return (
        <Routes>
            <Route index element={<Albums />} />
            <Route path=":id" element={<PhotosList />} />
        </Routes>
    );
}

export default AlbumsRoutes
