import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
// import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer
        // team: teamReducer,
    },
});
