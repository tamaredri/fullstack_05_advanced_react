import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Info from '../Components/Info';
import HomePage from '../Components/HomePage';

import AlbumsRoutes from './AlbumsRoutes';
import PostsRoutes from './PostsRoutes';
import TodosRoutes from './TodosRoutes';

function HomeRoutes({onLogout}) {
    return (
        <main>
            <HomePage onLogout={onLogout}/>
            <Routes>
                <Route path="/posts/*" element={<PostsRoutes />} />
                <Route path="/albums/*" element={<AlbumsRoutes />} />
                <Route path="/todos/*" element={<TodosRoutes />} />
                <Route path="/info" element={<Info />} />
                <Route index element={<DefaultPage />} />
            </Routes>
        </main>
    )
}

  
const DefaultPage = () => {
    return (
      <div>
        <h2>Welcome to the Application</h2>
        <p>Choose an option from the navigation above.</p>
      </div>
    );
};

export default HomeRoutes;
