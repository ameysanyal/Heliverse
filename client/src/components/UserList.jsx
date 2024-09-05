import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import UserCard from './UserCard';

const UserList = () => {
    const dispatch = useDispatch();
    const { page, users, searchQuery, filters, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers({ page, searchQuery, ...filters }));
        console.log(users)

    }, [dispatch, searchQuery, filters, page]);


    if (loading) return (<div className='w-screen absolute top-28 sm:top-2 flex justify-center items-center h-screen text-3xl text-center bg-indigo-100'>Loading...</div>)
    if (error) return <div className='text-xl'>Error: {error}</div>;

    return (
        <div className="px-6 bg-indigo-100 w-full overflow-y-auto h-screen">

            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 h-full w-full">
                {users.map(user => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default UserList;

