import React from 'react'
import Albums from '../Components/AlbumComponents/Albums'
import SingleAlbum from '../Components/AlbumComponents/SingleAlbum';
import { Route, Routes } from 'react-router-dom';

const AlbumsRoutes = () => {
    return (
        <Routes>
            <Route index element={<Albums />} />
            <Route path=":id" element={<SingleAlbum />} />
        </Routes>
    );
}

export default AlbumsRoutes
