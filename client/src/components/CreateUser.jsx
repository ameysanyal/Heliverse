import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from '../features/users/usersSlice';
import { useSnackbar } from 'notistack';

const CreateUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        avatar: '',
        domain: '',
        available: ''
    });
    const dispatch = useDispatch();
    const { page, searchQuery, filters } = useSelector((state) => state.users);

    const updateData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveUser = () => {

        dispatch(createUser({ data, enqueueSnackbar })).then(() => {
            dispatch(fetchUsers({ page, searchQuery, ...filters }));
            setData({
                first_name: '',
                last_name: '',
                email: '',
                gender: '',
                avatar: '',
                domain: '',
                available: ''
            });

        })
    };

    return (
        <div className='pt-15 flex justify-center bg-indigo-100 h-screen'>
            <div className='w-1/2 flex flex-row justify-center items-center'>
                <div className='flex flex-col border-2 border-gray-800 rounded-xl w-[600px] p-2 mx-auto'>

                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-4'>First Name:</label>
                        <input
                            type='text'
                            name="first_name"
                            value={data.first_name}
                            onChange={updateData}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>
                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-4'>Last Name:</label>
                        <input
                            type='text'
                            name="last_name"
                            value={data.last_name}
                            onChange={updateData}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>

                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-16'>Email:</label>
                        <input
                            type='text'
                            name="email"
                            onChange={updateData}
                            value={data.email}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>
                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-12' htmlFor="gender">Gender:</label>
                        <select
                            name="gender"
                            onChange={updateData}
                            value={data.gender}
                            className='border-2 border-gray-500 p-1 w-1/3'>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Agender">Agender</option>
                            <option value="Bigender">Bigender</option>
                            <option value="Polygender">Polygender</option>
                        </select>
                    </div>
                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-14'>Avatar:</label>
                        <input
                            type='text'
                            placeholder='Enter Image URL'
                            name="avatar"
                            value={data.avatar}
                            onChange={updateData}
                            className='border-2 border-gray-500 p-1 w-full'
                        />
                    </div>
                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-12' htmlFor="gender">Domain:</label>
                        <select
                            name="domain"
                            onChange={updateData}
                            value={data.domain}
                            className='border-2 border-gray-500 p-1 w-1/3'>
                            <option value="">Select Domain</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Management">Management</option>
                            <option value="UI Designing">UI Designing</option>
                            <option value="Business Development">Business Development</option>
                        </select>
                    </div>
                    <div className='flex my-2'>
                        <label className='text-xl text-nowrap mr-4' htmlFor="gender">Availabitlity:</label>
                        <select
                            name="available"
                            onChange={updateData}
                            value={data.available}
                            className='border-2 border-gray-500 p-1 w-1/3'>
                            <option value="">Select Availability</option>
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>
                    <button className='p-2 bg-gray-800 m-2 w-1/4 self-center text-white font-bold' onClick={handleSaveUser}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateUser
