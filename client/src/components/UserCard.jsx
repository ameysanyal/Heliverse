import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdMail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteUser, fetchUsers } from '../features/users/usersSlice';
import { updateTeam, addToTeam } from '../features/teams/teamSlice.js';
import UpdateUser from './UpdateUser';
import { useSnackbar } from 'notistack';

// import { addToTeam } from '../features/team/teamSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { page, searchQuery, filters } = useSelector((state) => state.users);
    const team = useSelector((state) => state.team.team);

    const [showEdit, setShowEdit] = useState(false)

    const handleAddToTeam = (memberId) => {
        if (user.available && !team.some(member => member.domain === user.domain)) {
            dispatch(updateTeam({ operation: "add", teamMember: memberId, enqueueSnackbar }));
            dispatch(addToTeam(user))
        }
        else {
            enqueueSnackbar(`User with ${user.domain} domain is already in the team.`, { variant: 'info' });
        }
    };

    const handleDeleteUser = () => {
        const id = user._id
        dispatch(deleteUser({ id, enqueueSnackbar })).then(() => {
            dispatch(fetchUsers({ page, searchQuery, ...filters }));
        });
    };

    return (

        <div className="bg-white shadow-md rounded-lg p-4 w-72 relative h-72">
            <MdMail className='hover:scale-125 transition-transform duration-200' title="E-mail" onClick={() => { window.location.href = `mailto:${user.email}` }} size={20} />
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-16 h-16 rounded-full mx-auto" />
            <div className='absolute gap-4 flex  top-4 right-2'>
                <MdDeleteForever className='self-center hover:scale-125 transition-transform duration-200' title="DeleteUser" size={22} onClick={handleDeleteUser} />
                <FaEdit title="EditUser" className='hover:scale-125 transition-transform duration-200' size={20} onClick={() => setShowEdit(true)} />
            </div>
            <h3 className="text-xl font-semibold text-center mt-2">{user.first_name} {user.last_name}</h3>
            <p className="text-center text-gray-700">Id: {user.id}</p>

            <h3 className="text-center text-gray-700">Gender: {user.gender}</h3>
            <p className="text-center text-gray-700">Domain: {user.domain}</p>
            <button
                onClick={() => { handleAddToTeam(user._id) }}
                className={`mt-4 w-full py-2 px-4 rounded ${user.available ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    } text-white`}
            >
                {user.available ? 'Add to Team' : 'Not Available'}
            </button>
            {showEdit && <UpdateUser userId={user._id} onClose={() => setShowEdit(false)} />}
        </div>

    );
};

export default UserCard;

