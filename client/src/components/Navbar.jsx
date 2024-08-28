import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="fixed flex w-full bg-indigo-950 justify-between p-2 z-50">
            <div className="flex items-center mx-2">
                <span className="text-2xl text-white font-bold">Heliverse</span>
            </div>
            <div>
                <Link to="/" className="text-xl text-white p-2 m-4 hover:bg-indigo-500 rounded-lg">
                    User List
                </Link>
                <Link to="/team" className="text-xl text-white p-2 m-4 hover:bg-indigo-500 rounded-lg">
                    Team
                </Link>
                <Link to="/create-user" className="text-xl text-white p-2 m-4 hover:bg-indigo-500 rounded-lg">
                    Create User
                </Link>

            </div>

        </div>
    )
}

export default Navbar

