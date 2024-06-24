
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ListPosts from '../Components/PostsComponents/ListPosts';
import NewPost from '../Components/PostsComponents/NewPost';
import FullPost from '../Components/PostsComponents/FullPost';

const PostsRoutes = () => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  const location = useLocation();
  const {backgroundLocation} = location.state || {};

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<ListPosts isAddingPost={isAddingPost}  />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/new" element={<NewPost setIsAddingPost={setIsAddingPost} />} />
          <Route path="/:id" element={<FullPost />} />
        </Routes>
      )}
    </>
  );
};

export default PostsRoutes;