import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';

const SinglePost = ({ post, onDeletePost }) => {
const location = useLocation();

    const handleDeletePost = async (post) => {
        try {
            const postsResponse = await axios.get(`http://localhost:3000/comments?postId=${post}`);
            const postIds = postsResponse.data.map(post => post.id);

            
            await Promise.all(postIds.map(postId =>
                axios.delete(`http://localhost:3000/comments/${postId}`)
            ));
            
            await onDeletePost(post);

        } catch (error) {
            console.error('Error deleting Post and comments:', error);
        }
    };
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
