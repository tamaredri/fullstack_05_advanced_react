import React, { useRef } from 'react';
import classes from '../../modules_css/Albums.module.css'

const FilterAlbums = ({ setSearchQuery, setFilterringMethod }) => {
    return (
        <div className={classes.searchContainer}>
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
