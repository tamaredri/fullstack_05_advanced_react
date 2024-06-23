import React, { useRef } from 'react';

const FilterAlbums = () => {
    const searchQuery = useRef('');
    const searchCriterion = useRef('');
    return (
        <div>
            <label>Search by: </label>

            <select ref={searchCriterion}>
                <option value="">None</option>
                <option value="serial">Serial Number</option>
                <option value="title">Title</option>
            </select>

            <input
                type="text"
                ref={searchQuery}
                placeholder="Search query"
            />

        </div>
    );
}

export default FilterAlbums;
