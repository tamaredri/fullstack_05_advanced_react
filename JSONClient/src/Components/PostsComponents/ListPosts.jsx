import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Filterring from '../Filterring';
import SinglePost from './SinglePost';

import classes from '../../modules_css/Posts.module.css';

const ListPosts = ({ isAddingPost }) => {
  const [filteringMethod, setFilterringMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const user = localStorage.getItem('user');

      let filterQuery = '';

      if (filteringMethod && searchQuery) {
        filterQuery = `&${filteringMethod}_like=${searchQuery}`;
      }

      try {
        const response = await fetch(`http://localhost:3000/posts?userId=${user}${filterQuery}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [searchQuery, filteringMethod, isAddingPost]);


  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      <Filterring
        setFilterringMethod={setFilterringMethod}
        setSearchQuery={setSearchQuery} />

<div className={classes.divider}></div>


      <button onClick={() => navigate('/homePage/posts/new', { state: { backgroundLocation: location } })}>
        Create New Post
      </button>
      <div className={classes.divider}></div>

      <ul className={classes.postsList}>
        {posts.map((post, index) => (
            <SinglePost 
            key={index}
            post={post}
            onDeletePost={handleDeletePost}
            location={location} />

        ))}
      </ul>


    </div>
  );
};

export default ListPosts;
