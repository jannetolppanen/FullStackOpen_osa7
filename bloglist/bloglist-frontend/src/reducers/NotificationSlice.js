import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: 'Sample',
  style: {
    color: 'red',
    display: 'none',
  },
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    create: (state, action) => {
      const { text, color } = action.payload

      const updatedState = state = {
        ...state,
        text: text,
        style: {
          ...state.style,
          display: 'block',
          color: color
        },
      }
      return updatedState
    },
    remove: (state, action) => {
      return initialState
    }
  },
})

// Action creators are generated for each case reducer function
export const { create, remove } = notificationSlice.actions

export default notificationSlice.reducer
