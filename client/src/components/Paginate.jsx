import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, fetchUsers } from '../features/users/usersSlice';

const Paginate = () => {
    const dispatch = useDispatch();
    const { page, totalPages } = useSelector((state) => state.users);


    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                onClick={handlePrevPage}
                className={`bg-indigo-950 text-white p-2 py-1 rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={page === 1}
            >
                Prev Page
            </button>
            <p>Page {page} of {totalPages}</p>
            {/* <input type="number" value={page} onChange={(e) => dispatch(setPage(e.target.value))} /> */}
            <button
                onClick={handleNextPage}
                className={`bg-indigo-950 text-white p-2 py-1 rounded-lg ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={page === totalPages}
            >
                Next Page
            </button>
        </div>
    );
};

export default Paginate;
