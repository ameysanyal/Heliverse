import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers, setSearchQuery } from '../features/users/usersSlice';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query));
    };


    return (

        <input
            type="text"
            placeholder="Search by name"
            className="w-80 p-2 border rounded-md border-indigo-950"
            onChange={handleSearch}
        />

    );
};

export default SearchBar;



