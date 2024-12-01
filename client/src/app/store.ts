import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice.ts'

export default configureStore({
  reducer: {
    auth: authSlice,
  },
})
