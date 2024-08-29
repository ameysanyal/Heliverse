import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeam, updateTeam, removeFromTeam } from '../features/teams/teamSlice.js';
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSnackbar } from 'notistack';

import { MdMail } from "react-icons/md";

const TeamDetails = () => {
    const [showUserDetails, setShowUserDetails] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const team = useSelector((state) => state.team.team);

    useEffect(() => {
        dispatch(fetchTeam())
    }, [])

    if (team.length === 0) {
        return <p className='pt-16 text-3xl'>No team created yet.</p>;
    }

    const handleRemoveMember = (memberId) => {
        dispatch(updateTeam({ operation: "remove", teamMember: memberId, enqueueSnackbar }))
        dispatch(removeFromTeam({ id: memberId }));
    };

    const handleShowProfile = (user) => {
        setUserDetails(user)
        setShowUserDetails(true)

    }

    return (
        <div className="pt-16 bg-indigo-100 h-screen">
            <h3 className="text-2xl text-center font-bold mb-4 text-gray-800">Team Members</h3>
            <ul className="flex flex-col justify-center items-center space-y-3">
                {team.map((user) => (
                    <li
                        key={user._id}
                        className="w-1/2 flex items-center justify-between p-3 bg-indigo-950 text-white rounded-lg shadow-md">
                        <div>
                            <span className="text-xl font-medium ">
                                {user.first_name} {user.last_name},
                            </span>
                            <span className="ml-2 text-lg">{user.domain}</span>
                        </div>
                        <div className='flex justify-end space-x-4 mr-2'>
                            <button className="hover:text-green-500 font-semibold text-white">
                                <CgProfile size={22} title='Profile Details' onClick={() => { handleShowProfile(user) }} />
                            </button>
                            <button className="hover:text-red-500 font-semibold text-white" onClick={() => {
                                handleRemoveMember(user._id)
                            }}>
                                <IoCloseCircleOutline size={28} title='Remove from team' />
                            </button>
                        </div>
                    </li>
                ))
                }
            </ul>
            {showUserDetails &&
                (<div className="fixed z-50 bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center" onClick={() => setShowUserDetails(false)}>
                    <div className="bg-white shadow-md rounded-lg p-4 w-72 relative h-72">
                        <MdMail title="E-mail" onClick={() => { window.location.href = `mailto:${userDetails.email}` }} size={20} />
                        <img src={userDetails.avatar} alt={`${userDetails.first_name} ${userDetails.last_name}`} className="w-16 h-16 rounded-full mx-auto" />

                        <h3 className="text-xl font-semibold text-center my-2">{userDetails.first_name} {userDetails.last_name}</h3>
                        <p className="text-center text-lg mb-2">Id: {userDetails.id}</p>

                        <h3 className="text-center text-lg mb-2">Gender: {userDetails.gender}</h3>
                        <p className="text-center text-lg mb-2">Domain: {userDetails.domain}</p>
                    </div>
                </div>)
            }
        </div>

    );
};


export default TeamDetails;
