import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    users: [],
    isError: false,
    isLoading: false,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    message: '',
}

// Get users
export const getUsers = createAsyncThunk(
    'users/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.getUsers(token)
        } catch (err) {
            console.log(err)
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Add new user
export const AddUser = createAsyncThunk(
    'users/create',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.AddUser(user, token)
        } catch (err) {
            console.log(err)
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update user
export const updateUser = createAsyncThunk(
    'users/update',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.updateUser(user, token)
        } catch (err) {
            console.log(err)
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Delete user
export const deleteUser = createAsyncThunk(
    'users/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await userService.deleteUser(id, token)
        } catch (err) {
            console.log(err)
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    
        reset: (state) => {
            state.isError= false;
            state.isLoading= false;
            state.addSuccess= false;
            state.updateSuccess= false;
            state.deleteSuccess= false;
            state.message= '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(AddUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.addSuccess = true
                state.users.push(action.payload)
            })
            .addCase(AddUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.updateSuccess = true
                const index = state.users.findIndex(user => user._id === action.payload._id)
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.deleteSuccess = true
                state.users = state.users.filter(user => user._id !== action.payload.id)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})
export const { reset } = userSlice.actions
export default userSlice.reducer
