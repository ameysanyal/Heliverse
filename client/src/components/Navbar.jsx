import React from 'react'
import { NavLink } from "react-router-dom"

const active = "mr-2 text-sm  text-white p-1 sm:text-lg sm:p-1 bg-indigo-500 rounded-lg"

const inActive = "mr-2 text-sm  text-white p-1 sm:text-lg sm:p-1  hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-500 rounded-lg"

const Navbar = () => {
    return (
        <div className="fixed flex w-full bg-indigo-950 justify-between p-2 z-50">
            <div className="flex items-center mx-2">
                <span className="text-xl text-white font-bold">Heliverse</span>
            </div>
            <div>

                <NavLink to="/" className={({ isActive }) => isActive ? active : inActive}>
                    User List
                </NavLink>
                <NavLink to="/team" className={({ isActive }) => isActive ? active : inActive}>
                    Team
                </NavLink>
                <NavLink to="/create-user" className={({ isActive }) => isActive ? active : inActive}>
                    Create User
                </NavLink>

            </div>

        </div>
    )
}

export default Navbar

