import React, { useRef } from 'react';
import axios from 'axios';

import classes from '../../modules_css/Todos.module.css'

const AddTodo = ({ isAddingTodo, setAddingTodo }) => {

    const newTodo = useRef('');

    const handleAddTodo = async () => {
        try {
            const userId = localStorage.getItem('user');
            const response = await axios.get(`http://localhost:3000/todos`);
            const existingTodos = response.data;
            const largestTodoId = existingTodos.reduce((maxId, todo) => {
                return parseInt(todo.id) > maxId ? parseInt(todo.id) : maxId;
            }, 0);

            await axios.post('http://localhost:3000/todos',
                {
                    userId: userId,
                    id: String(largestTodoId + 1),
                    title: newTodo.current.value,
                    completed: false
                }
            );

            setAddingTodo(false);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };


    return (
        <div className={classes.add}>
            {!isAddingTodo ? (
                <button onClick={() => setAddingTodo(true)}>Add New Todo</button>
            ) : (
                <>
                    <input
                        type="text"
                        ref={newTodo}
                        placeholder="New todo"
                    />

                    <button onClick={handleAddTodo}>Add</button>
                    <button onClick={() => setAddingTodo(false)}>Cancle</button>
                </>
            )}
        </div>
    );
}

export default AddTodo;
