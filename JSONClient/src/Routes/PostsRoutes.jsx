import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPosts from '../Components/PostsComponents/ListPosts';
import NewPost from '../Components/PostsComponents/NewPost';
import SinglePost from '../Components/PostsComponents/SinglePost';

const PostsRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>
    );
};

export default PostsRoutes;

/*import React from 'react';
import ListPosts from '../Components/ListPosts'
import NewPost from '../Components/NewPost'

const PostsRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ListPosts />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    );
  };

export default PostsRoutes;*/
