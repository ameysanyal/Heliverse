import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../../config.js'

const backendUrl = config.backendUrl;

const initialState = {
    team: [],
    loading: false,
    error: null,
};


export const fetchTeam = createAsyncThunk(
    'team/fetchTeam',
    async (args, { rejectWithValue }) => {

        try {
            const response = await fetch(`${backendUrl}/api/team/66d04d1e517dafbc1331eecb`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch team');
            }
            console.log(data.users)

            return data.users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTeam = createAsyncThunk('users/updateUser',
    async ({ teamMember, operation, enqueueSnackbar }, { rejectWithValue }) => {
        try {
            console.log(teamMember)
            const response = await fetch(
                `${backendUrl}/api/team/66d04d1e517dafbc1331eecb`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ teamMember, operation }),
                }
            );

            const result = await response.json();

            if (response.status === 200) {
                if (operation == "add") { enqueueSnackbar(`User added to team`, { variant: 'success' }); }
                else if (operation = "remove") { enqueueSnackbar(`User removed from team`, { variant: 'success' }); }
            }

            if (response.status === 400) {
                enqueueSnackbar(`${result.message}`, { variant: 'error' });
            }

            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }

)


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
            console.log(action.payload.id)
            state.team = state.team.filter(user => user._id !== action.payload.id);
        },
        clearTeam: state => {
            state.team = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.team = [...action.payload];


            }).addCase(fetchTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

    }
});

export const { addToTeam, removeFromTeam, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;

