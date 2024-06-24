
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ListPosts from '../Components/PostsComponents/ListPosts';
import NewPost from '../Components/PostsComponents/NewPost';
import SinglePost from '../Components/PostsComponents/SinglePost';
import Modal from '../Components/Modal';

const PostsRoutes = () => {
  const location = useLocation();
  const state = location.state || {};
  const [posts, setPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<ListPosts posts={posts} setPosts={setPosts} />} />
        <Route path="/new" element={<NewPost onNewPost={handleNewPost} />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route path="/new" element={<Modal><NewPost onNewPost={handleNewPost} /></Modal>} />
          <Route path="/:id" element={<Modal><SinglePost /></Modal>} />
        </Routes>
      )}
    </>
  );
};

export default PostsRoutes;

/*import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ListPosts from '../Components/PostsComponents/ListPosts';
import NewPost from '../Components/PostsComponents/NewPost';
import SinglePost from '../Components/PostsComponents/SinglePost';
import Modal from '../Components/Modal';

const PostsRoutes = () => {
  const location = useLocation();
  const state = location.state || {};

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<ListPosts />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/:id" element={<SinglePost />} />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route path="/new" element={<Modal><NewPost /></Modal>} />
          <Route path="/:id" element={<Modal><SinglePost /></Modal>} />
        </Routes>
      )}
    </>
  );
};

export default PostsRoutes;
*/