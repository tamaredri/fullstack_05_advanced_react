import React, { useEffect, useRef } from 'react';

import classes from '../../modules_css/Posts.module.css';


const PostBody = ({ post, isPostInEdit, setIsPostInEdit }) => {
    const editedTitle = useRef('');
    const editedBody = useRef('');

    useEffect(()=>{
        if(isPostInEdit){
            editedTitle.current.value = post.title;
            editedBody.current.value = post.body;
        }

    }, [post])

    
  const handleSavePost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editedTitle.current.value,
          body: editedBody.current.value
        })
      });

      if (response.ok) {
        setIsPostInEdit(false);
      } 
      
      else {
        console.error('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

    return (
        <div>
            {isPostInEdit ? (
                <div className={classes.postData}>
                  <p>Title:</p>
                    <input
                        type="text"
                        ref={editedTitle}
                    />

                    <p>Body:</p>
                    <textarea ref={editedBody} />
                    <button onClick={handleSavePost}>Save</button>
                </div>
            )
                :
                (
                    <div className={classes.postContainer}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button onClick={() => setIsPostInEdit(true)}>Edit Post</button>
                    </div>
                )}
        </div>
    );
}

export default PostBody;
