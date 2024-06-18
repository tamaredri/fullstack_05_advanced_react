import React from 'react';
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

export default PostsRoutes;
