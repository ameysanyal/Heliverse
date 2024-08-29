import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser } from '../features/users/usersSlice';
import { MdOutlineClose } from "react-icons/md"
import { useSnackbar } from 'notistack';

const UpdateUser = ({ userId, onClose }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [id, setId] = useState('')
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [domain, setDomain] = useState('');
    const [available, setAvailable] = useState('');

    const dispatch = useDispatch();
    const { page, users, searchQuery, filters, loading } = useSelector((state) => state.users);

    useEffect(() => {

        if (userId) {
            const singleData = users.find((user) => user._id === userId);
            console.log("singledata preload on edit page...", singleData);
            console.log(singleData)
            setId(singleData._id)
            setFirstName(singleData.first_name)
            setLastName(singleData.last_name)
            setEmail(singleData.email)
            setGender(singleData.gender)
            setAvatar(singleData.avatar)
            setDomain(singleData.domain)
            setAvailable(singleData.available)
        }
    }, []);

    const handleUpdateUser = (e) => {
        const updatedData = {
            id,
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available
        };

        console.log("update data..", updatedData);
        dispatch(updateUser({ updatedData, enqueueSnackbar })).then(() => {
            dispatch(fetchUsers({ page, searchQuery, ...filters }));
            onClose();
        });

    };
    if (loading) {
        return <h2>Loading..</h2>;
    }

    return (
        <div className="fixed z-50 bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
            <div className="bg-indigo-950 flex flex-col rounded-md p-2 relative w-1/2" onClick={(e) => { e.stopPropagation() }}>
                <MdOutlineClose className='text-white m-1 cursor-pointer absolute top-4 right-4' title="close" size={30} onClick={onClose} />
                <h2 className='text-2xl text-white m-2 text-center'>Edit User Details</h2>
                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-col border-2 border-gray-800 rounded-xl w-[600px] p-2 mx-auto'>

                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-4'>First Name:</label>
                            <input
                                type='text'
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-4'>Last Name:</label>
                            <input
                                type='text'
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>

                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-16'>Email:</label>
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-12' htmlFor="gender">Gender:</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-1/3' name="classroom" id="classroom">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Agender">Agender</option>
                                <option value="Bigender">Bigender</option>
                                <option value="Polygender">Polygender</option>
                            </select>
                        </div>
                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-14'>Avatar:</label>
                            <input
                                type='text'
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-full'
                            />
                        </div>
                        <div className='flex my-2'>
                            <label className='text-xl text-nowrap text-white mr-12' htmlFor="gender">Domain:</label>
                            <select
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
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
                            <label className='text-xl text-nowrap text-white mr-4' htmlFor="gender">Availabitlity:</label>
                            <select
                                value={available}
                                onChange={(e) => setAvailable(e.target.value)}
                                className='border-2 border-gray-500 p-1 w-1/3'>
                                <option value="">Select Availability</option>
                                <option value={true}>Available</option>
                                <option value={false}>Not Available</option>
                            </select>
                        </div>
                        <button className='p-2 bg-indigo-500 m-2 w-1/4 self-center text-white font-bold' onClick={handleUpdateUser}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
