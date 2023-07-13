import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

const LeftCounterSlice = createSlice({
  name: 'leftCounter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = LeftCounterSlice.actions

export default LeftCounterSlice.reducer