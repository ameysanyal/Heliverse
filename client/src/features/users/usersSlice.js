import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../../config.js';

const backendUrl = config.backendUrl;

const initialState = {
    users: [],
    filteredUsers: 0,
    page: 1,
    totalPages: 0,
    searchQuery: '',
    filters: {
        domain: '',
        gender: '',
        available: '',
    },
    loading: true,
    error: null,
};

// Thunk for fetching users from the API
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params, { rejectWithValue }) => {

        try {
            const response = await fetch(`${backendUrl}/api/users?page=${params.page}&search=${params.searchQuery}&domain=${params.domain}&gender=${params.gender}&available=${params.available}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch users');
            }
            // console.log(data.users)

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async ({ data, enqueueSnackbar }, { rejectWithValue }) => {

        try {
            const response = await fetch(
                `${backendUrl}/api/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (response.status === 400) {
                enqueueSnackbar(`${result.message} `, { variant: 'error' });
            }

            if (response.status === 201) {
                enqueueSnackbar('User Created Successfully', { variant: 'success' });
            }

            return result;
        } catch (error) {

            enqueueSnackbar('Failed to create User', { variant: 'error' });
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async ({ id, enqueueSnackbar }, { rejectWithValue }) => {
        console.log(id)
        try {
            const response = await fetch(
                `${backendUrl}/api/users/${id}`,
                {
                    method: "DELETE",
                }
            );
            const result = await response.json();

            if (response.status === 200) {
                enqueueSnackbar('User Deleted Successfully', { variant: 'success' });
            }

            return result;

        }
        catch (error) {
            enqueueSnackbar('Failed to delete User', { variant: 'error' });
            return rejectWithValue(error.message);
        }
    }
)

export const updateUser = createAsyncThunk('users/updateUser',
    async ({ updatedData, enqueueSnackbar }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/users/${updatedData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await response.json();

            if (response.status === 200) {
                enqueueSnackbar(`${result.message}`, { variant: 'success' });
            }

            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }

)


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.filteredUsers = action.payload.total;
                state.totalPages = action.payload.pages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload)


            }).addCase(createUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            }).addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((user) => user._id !== id);
                }
            }).addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            }).addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("updated user fulfilled", action.payload);
                state.loading = false;
                state.users = state.users.map((ele) =>
                    ele.id === action.payload.id ? action.payload : ele
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { setPage, setFilters, setSearchQuery } = usersSlice.actions;

export default usersSlice.reducer;

