import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import FilterTodos from './FilterTodos';
import SingleTodo from './SingleTodo';


const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [sortCriterion, setSortCriterion] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionFilter, setExecutionFilter] = useState('');
  const [isAddingTodo, setAddingTodo] = useState(false);

  const [editTodoId, setEditTodoId] = useState(null);
  const [changeComplete, setChangeComplete] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const userId = localStorage.getItem('user');
      let query = `userId=${userId}`;

      console.log(sortCriterion, searchCriterion, searchQuery, executionFilter);

      if (executionFilter) {
        query += `&completed=${executionFilter}`;
      }
      if (sortCriterion && sortCriterion != 'id') {
        query += `&_sort=${sortCriterion}&_order=asc`;
      }
      if (searchCriterion && searchQuery) {
        query += `&${searchCriterion}_like=${searchQuery}`;
      }
      console.log(query);

      const response = await axios.get(`http://localhost:3000/todos?${query}`);
      console.log(response.data)
      setTodos(response.data);
    };
    fetchTodos();
  }, [isAddingTodo,
      editTodoId,
      changeComplete,
      sortCriterion,
      searchCriterion,
      searchQuery,
      executionFilter]);


  return (
    <div>
      <h2>Todos</h2>

      <AddTodo isAddingTodo={isAddingTodo} setAddingTodo={setAddingTodo} />

      <div></div>

      <FilterTodos
        setSortMethod={setSortCriterion}
        setFilterMethod={setSearchCriterion}
        setSearchQuery={setSearchQuery}
        setCompleteFilter={setExecutionFilter} />

      <div></div>

      <ul>
        {todos.map((todo, index) => (
          <SingleTodo
            key={index}
            todo={todo}
            isEditable={editTodoId === todo.id}
            setEditTodoId={setEditTodoId}
            setChangeComplete={setChangeComplete} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;