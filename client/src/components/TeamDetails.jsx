import React from 'react';
import { useSelector } from 'react-redux';

// const TeamDetails = () => {
//     const team = useSelector((state) => state.team.team);

//     if (team.length === 0) {
//         return <p>No team created yet.</p>;
//     }

//     return (
//         <div className="mt-4 pt-16">
//             <h3 className="text-xl font-semibold">Team Details</h3>
//             <ul className="list-disc pl-5">
//                 {team.map((user) => (
//                     <li key={user.id} className="mt-2">
//                         {user.first_name} {user.last_name} - {user.domain}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

const TeamDetails = () => {
    return (
        <div className='pt-16 text-3xl'>Team</div>
    )
}

export default TeamDetails;
