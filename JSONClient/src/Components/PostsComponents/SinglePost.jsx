import React, { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';


const SinglePost = ({ post, onDeletePost, location }) => {

  const [error, setError] = useState('');
    const handleDeletePost = async (post) => {
        try {
            const postsResponse = await fetch(`http://localhost:3000/comments?postId=${post}`);
            if (!postsResponse.ok) {
                setError('Network response was not ok, failed on getting the comments of this post');
            }
            const data = await postsResponse.json();
            const postIds = data.map(post => post.id);

            
            await Promise.all(postIds.map(postId =>
              fetch(`http://localhost:3000/comments/${postId}`, {
                  method: 'DELETE'
              }).then(response => {
                  if (!response.ok) {
                      setError('Network response was not ok, failed on deleting the comments of this post');
                  }
              })
          ));
          
            
            await onDeletePost(post);

        } catch (error) {
            setError('Error deleting Post and comments:', error);
        }
    };

    if (error) {
      return <div>{error}</div>;
    }

    return (
        <li >
            <Link to={`/homePage/posts/${post.id}`} state={{ backgroundLocation: location }}>
                {post.id} - {post.title}
            </Link>

            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </li>
    );
}

export default SinglePost;
