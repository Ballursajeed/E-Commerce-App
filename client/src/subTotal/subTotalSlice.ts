import { createSlice } from '@reduxjs/toolkit'

export const subTotalSlice = createSlice({
  name: 'subTotal',
  initialState: {
    amount: 0,
  },
  reducers: {
    setAmount: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        state.amount = action.payload
      },
      decrement: (state) => {
        state.amount -= 1
      },
    incrementByAmount: (state, action) => {
      state.amount += action.payload
    },
    decrementByAmount: (state, action) => {
        state.amount -= action.payload
      },
  },
})

export const { setAmount,decrementByAmount, incrementByAmount } = subTotalSlice.actions

export default subTotalSlice.reducer