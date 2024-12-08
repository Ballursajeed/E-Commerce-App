import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice.ts'
import subTotalSlice  from '../subTotal/subTotalSlice.ts'

export default configureStore({
  reducer: {
    auth: authSlice,
    subTotal: subTotalSlice,
  },
})
