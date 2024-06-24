import React from 'react';

const PostContent = ({ post, editingPost, setEditingPost, editedTitleRef, editedBodyRef, handleSavePost }) => {
  return (
    <div>
      <h2>
        {editingPost ? (
          <input
            type="text"
            defaultValue={post.title}
            onChange={(e) => (editedTitleRef.current = e.target.value)}
          />
        ) : (
          post.title
        )}
      </h2>
      <p>
        {editingPost ? (
          <textarea
            defaultValue={post.body}
            onChange={(e) => (editedBodyRef.current = e.target.value)}
          />
        ) : (
          post.body
        )}
      </p>
      {editingPost ? (
        <button onClick={handleSavePost}>Save</button>
      ) : (
        <button onClick={() => setEditingPost(true)}>Edit Post</button>
      )}
    </div>
  );
};

export default PostContent;
