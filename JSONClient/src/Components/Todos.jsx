import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [sortCriterion, setSortCriterion] = useState('serial');
  const [searchCriterion, setSearchCriterion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionFilter, setExecutionFilter] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const userId = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/todos?userId=${userId}`);
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const userId = localStorage.getItem('user');
      const response = await axios.get(`http://localhost:3000/todos`);
      const existingTodos = response.data;
      const largestTodoId = existingTodos.reduce((maxId, todo) => {
        return parseInt(todo.id) > maxId ? parseInt(todo.id) : maxId;
      }, 0);

      const newTodoItem = {
        userId: parseInt(userId),
        id: String(largestTodoId + 1),
        title: newTodo,
        completed: false
      };

      const addTodoResponse = await axios.post('http://localhost:3000/todos', newTodoItem);
      setTodos([...todos, addTodoResponse.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await axios.put(`http://localhost:3000/todos/${id}`, {
        ...todo,
        completed: !todo.completed
      });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (id, title) => {
    setEditTodoId(id);
    setEditTodoText(title);
  };

  const handleUpdateTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await axios.put(`http://localhost:3000/todos/${id}`, {
        ...todo,
        title: editTodoText
      });
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      setEditTodoId(null);
      setEditTodoText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const sortedTodos = [...todos].sort((a, b) => {
    switch (sortCriterion) {
      case 'serial':
        return a.id - b.id;
      case 'performance':
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'random':
        return Math.random() - 0.5;
      default:
        return a.id - b.id;
    }
  });

  const filteredTodos = sortedTodos.filter(todo => {
    let matchesSearch = true;
    if (searchCriterion === 'serial') {
      matchesSearch = todo.id.toString().includes(searchQuery);
    } else if (searchCriterion === 'title') {
      matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (executionFilter === 'completed') {
      matchesSearch = matchesSearch && todo.completed;
    } else if (executionFilter === 'notCompleted') {
      matchesSearch = matchesSearch && !todo.completed;
    }

    return matchesSearch;
  });

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

      <div>
        <label>Sort by: </label>
        <select onChange={(e) => setSortCriterion(e.target.value)} value={sortCriterion}>
          <option value="serial">Serial Number</option>
          <option value="performance">Performance</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>

        <label>Search by: </label>
        <select onChange={(e) => setSearchCriterion(e.target.value)} value={searchCriterion}>
          <option value="">None</option>
          <option value="serial">Serial Number</option>
          <option value="title">Title</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search query"
        />

        <label>Execution Status: </label>
        <select onChange={(e) => setExecutionFilter(e.target.value)} value={executionFilter}>
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.id}. </span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
              />
            ) : (
              <span>{todo.title}</span>
            )}
            {editTodoId === todo.id ? (
              <>
                <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditTodo(todo.id, todo.title)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;