import React, { useRef } from 'react';
import axios from 'axios';

import classes from '../../modules_css/Todos.module.css'

const SingleTodo = ({ todo, isEditable, setEditTodoId, setChangeComplete }) => {
    const editedText = useRef('');

    const handleToggle = async (id) => {
        try {
            setChangeComplete(false);
            await axios.patch(`http://localhost:3000/todos/${id}`, {
                completed: !todo.completed
            });
            setChangeComplete(true);
        } catch (error) {
            console.error('Error toggling todo completion:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            setChangeComplete(false);
            await axios.delete(`http://localhost:3000/todos/${id}`);
            setChangeComplete(true);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleUpdateTodo = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/todos/${id}`, {
                title: editedText.current.value
            });
            setEditTodoId(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };


    return (
        <li>
            <button className={classes.editButton} onClick={() => handleDeleteTodo(todo.id)}>🗑️</button>

            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
            />

            <span>{todo.id}. </span>

            {isEditable ? (
                <>
                    <input
                        type="text"
                        ref={editedText}
                        placeholder='what to do?'
                    />
                    <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                    <button onClick={() => setEditTodoId(null)}>Cancel</button>
                </>
            ) : (
                <>
                    <span>{todo.title}</span>
                    <button className={classes.editButton} onClick={() => setEditTodoId(todo.id)}>✏️</button>
                </>
            )}

        </li>
    );
}

export default SingleTodo;
