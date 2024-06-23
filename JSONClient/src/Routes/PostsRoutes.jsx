import React from 'react';
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

/*import React from 'react';
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

export default PostsRoutes;*/

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
