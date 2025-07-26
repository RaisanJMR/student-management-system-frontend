import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import studentService from './studentService'

const initialState = {
    students: [],
    isError: false,
    isLoading: false,
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false,
    message: '',
}

// Get students
export const getStudents = createAsyncThunk(
    'students/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.getStudents(token)
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

// Add new student
export const AddStudent = createAsyncThunk(
    'students/create',
    async (student, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.AddStudent(student, token)
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
// update student
export const updateStudent = createAsyncThunk(
    'students/update',
    async (student, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.updateStudent(student, token)
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

// delete student
export const deleteStudent = createAsyncThunk(
    'students/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await studentService.deleteStudent(id, token)
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

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {

        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.addSuccess = false;
            state.updateSuccess = false;
            state.deleteSuccess = false;
            state.message = '';
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students = action.payload
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(AddStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.addSuccess = true;
                state.students.push(action.payload)
            })
            .addCase(AddStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.addSuccess = true;
                state.updateSuccess = true;
                const index = state.students.findIndex(student => student._id === action.payload._id);
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.deleteSuccess = true;
                state.students = state.students.filter(student => student._id !== action.payload._id);
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = studentSlice.actions
export default studentSlice.reducer