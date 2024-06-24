import React, { useRef } from 'react';

const AddComment = ({ userEmail, setFinishAdding, postId }) => {
    const title = useRef('');
    const body = useRef('');


    const handleAddComment = async () => {
        setFinishAdding(false);

        if (!title.current.value.trim() || !body.current.value.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            let maxId = 0;
            const allCommentsRes = await fetch(`http://localhost:3000/comments`);

            if (allCommentsRes.ok) {
                const data = await allCommentsRes.json();
                maxId = Math.max(...data.map(comment => comment.id), 0);
            } else {
                console.error('Failed to fetch all comments');
            }

            const response = await fetch(`http://localhost:3000/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: parseInt(postId),
                    id: String(maxId + 1),
                    name: title.current.value,
                    email: userEmail,
                    body: body.current.value
                })
            });

            if (response.ok) {
                title.current.value = '';
                body.current.value = '';
                setFinishAdding(true);
            }
            
            else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                ref={title}
                placeholder="title"
            />
            <input
                type="text"
                ref={body}
                placeholder="Comment Body"
            />

            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
}

export default AddComment;
