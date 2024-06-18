import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NewPost from '../Components/NewPost';
import ListPosts from '../Components/ListPosts';
import Albums from '../Components/Albums';
import Todos from '../Components/Todos';
import Info from '../Components/Info';
import HomePage from '../Components/HomePage';

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

const PostsRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    );
  };

const AlbumsRoutes = () => {
    return <Albums />;
}

const TodosRoutes = () => {
    return <Todos />;
}

  
const DefaultPage = () => {
    return (
      <div>
        <h2>Welcome to the Application</h2>
        <p>Choose an option from the navigation above.</p>
      </div>
    );
};

export default HomeRoutes
