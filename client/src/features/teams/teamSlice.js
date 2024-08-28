import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    team: [],
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        addToTeam: (state, action) => {
            const user = action.payload;
            if (!state.team.some(member => member.domain === user.domain)) {
                state.team.push(user);
            }
        },
        removeFromTeam: (state, action) => {
            state.team = state.team.filter(user => user.id !== action.payload.id);
        },
        clearTeam: state => {
            state.team = [];
        },
    },
});

export const { addToTeam, removeFromTeam, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;
