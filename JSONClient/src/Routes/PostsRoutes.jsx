
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ListPosts from '../Components/PostsComponents/ListPosts';
import NewPost from '../Components/PostsComponents/NewPost';
import FullPost from '../Components/PostsComponents/FullPost';

const PostsRoutes = () => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  const location = useLocation();
  const state = location.state || {};

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<ListPosts isAddingPost={isAddingPost}  />} />
        <Route path="/new" element={<NewPost setIsAddingPost={setIsAddingPost} />} />
        <Route path="/:id" element={<FullPost />} />
      </Routes>
    </>
  );
};

export default PostsRoutes;