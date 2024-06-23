import React from 'react';

const FilterTodos = ({setSortMethod, setFilterMethod, setSearchQuery,setCompleteFilter}) => {

    return (
        <div>
            <label>Sort by: </label>

            <select onChange={(e) => setSortMethod(e.target.value)}>
                <option value="">None</option>
                <option value="id">Serial Number</option>
                <option value="completed">Performance</option>
                <option value="title">Alphabetical</option>
            </select>

            <label>Search by: </label>
            <select onChange={(e) => setFilterMethod(e.target.value)}>
                <option value="">None</option>
                <option value="id">Serial Number</option>
                <option value="title">Title</option>
            </select>

            <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search query"
            />

            <label>Execution Status: </label> 
            <select onChange={(e) => setCompleteFilter(e.target.value)}>
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
            </select>
        </div>
    );
}

export default FilterTodos;
