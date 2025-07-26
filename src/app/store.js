import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import studentReducer from '../features/students/studentSlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    user: userReducer,
  },
})