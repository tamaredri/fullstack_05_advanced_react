import React, { useRef } from 'react';

const FilterAlbums = ({ setSearchQuery, setFilterringMethod }) => {


    return (
        <div>
            <label>Search by: </label>

            <select
                onChange={(e) => { setFilterringMethod(e.target.value) }}>
                <option value="">None</option>
                <option value="id">Serial Number</option>
                <option value="title">Title</option>
            </select>

            <input
                type="text"
                onChange={(e) => { setSearchQuery(e.target.value) }}
                placeholder="Search query"
            />

        </div>
    );
}

export default FilterAlbums;
