import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilters } from '../features/users/usersSlice';
import SearchBar from './SearchBar';
import Paginate from './Paginate';


const Filters = () => {
    const dispatch = useDispatch();
    const { filters, filteredUsers } = useSelector((state) => state.users);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        const newFilters = { ...filters, [name]: value };
        console.log(newFilters)
        dispatch(setFilters(newFilters)); // Update filters in the state

    };

    return (
        <div className="pt-14 w-full flex flex-wrap justify-center md:justify-evenly gap-2 p-4 bg-indigo-100 rounded-md top-0 fixed z-20">
            <SearchBar />
            <p className='self-center font-semibold text-center md:text-left'>Filtered Users: <br /> {filteredUsers}</p>
            <select name="domain" onChange={handleFilterChange} className="p-1 h-10 self-center border rounded-md border-indigo-950 w-full md:w-44">
                <option value="">All Domains</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Management">Management</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Business Development">Business Development</option>
            </select>

            <select name="gender" onChange={handleFilterChange} className="p-1 h-10 self-center border rounded-md border-indigo-950 w-full md:w-36">
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
                <option value="Polygender">Polygender</option>
            </select>

            <select name="available" onChange={handleFilterChange} className="p-1 h-10 self-center border rounded-md  border-indigo-950 w-full md:w-36">
                <option value="">Availability</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
            </select>

            <Paginate />

        </div>
    );
};

export default Filters;

