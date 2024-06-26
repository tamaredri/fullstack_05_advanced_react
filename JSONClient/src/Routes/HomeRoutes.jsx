import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Info from '../Components/Info';
import HomePage from '../Components/EntryComponents/HomePage';

import AlbumsRoutes from './AlbumsRoutes';
import PostsRoutes from './PostsRoutes';
import TodosRoutes from './TodosRoutes';

import classes from '../modules_css/Home.module.css'

function HomeRoutes({ onLogout }) {
    return (
        <div className={classes.home}>
            <HomePage onLogout={onLogout} />

            <main className={classes.displayCard}>
                <Routes>
                    <Route path="/posts/*" element={<PostsRoutes />} />
                    <Route path="/albums/*" element={<AlbumsRoutes />} />
                    <Route path="/todos/*" element={<TodosRoutes />} />
                    <Route path="/info" element={<Info />} />
                    <Route index element={<DefaultPage />} />
                </Routes>
            </main>

        </div>
    )
}


const DefaultPage = () => {
    return (
        <div className={classes.flex}>
            <h2>Welcome to the Application</h2>
            <p>Choose an option from the navigation above.</p>
        </div>
    );
};

export default HomeRoutes;
