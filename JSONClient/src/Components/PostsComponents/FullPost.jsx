import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal.jsx';
import EditCommentForm from './EditCommentForm.jsx';
import PostBody from './PostBody.jsx';
import AddComment from './AddComment.jsx';

import classes from '../../modules_css/Posts.module.css';


const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [finishAdding, setFinishAdding] = useState(true);
  const [comments, setComments] = useState([]);

  const [inDelete, setInDelete] = useState(false);
  const [isPostInEdit, setIsPostInEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(null);
  const [error, setError] = useState('');


  const userEmail = useRef('');

  useEffect(() => {
    const fetchUserMail = async () => {
      try {
        const userId = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/users?id=${userId}`);

        if (response.ok) {
          const data = await response.json();
          userEmail.current = data[0].email;
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchUserMail();
  }, [id])


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts?id=${id}`);

        if (response.ok) {
          const data = await response.json();

          setPost(data[0]);
        }

        else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments?postId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.map(comment => ({ ...comment, editing: false })));
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [
    id,
    isPostInEdit,
    editedComment,
    inDelete,
    finishAdding]);




  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Modal>

      <PostBody
        post={post}
        isPostInEdit={isPostInEdit}
        setIsPostInEdit={setIsPostInEdit}
      />

      <h3>Comments:</h3>

      <ul className={classes.commentList}>
        {comments.map((comment, index) => (
          <EditCommentForm
            key={index}
            userId={id}
            comment={comment}
            isInEdit={editedComment === comment.id}
            isEditable={userEmail.current === comment.email}
            setEdittingId={setEditedComment}
            setInDelete={setInDelete} />
        ))}
      </ul>


      <AddComment
        postId={id}
        userEmail={userEmail.current}
        setFinishAdding={setFinishAdding} />

      {error && <p>{error}</p>}

    </Modal>
  );
};

export default FullPost;
