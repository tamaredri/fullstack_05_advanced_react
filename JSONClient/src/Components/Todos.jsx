import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:4000/todos?userId=${user.id}`);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post('http://localhost:4000/todos', {
      userId: user.id,
      title: newTodo,
      completed: false
    });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    const response = await axios.put(`http://localhost:4000/todos/${id}`, {
      ...todo,
      completed: !todo.completed
    });
    setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>Todos</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
