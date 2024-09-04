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
            className="w-full p-1 h-10 self-center border rounded-md border-indigo-950 md:w-80"
            onChange={handleSearch}
        />

    );
};

export default SearchBar;



