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
      console.log('create triggered');

      const updatedState = state = {
        ...state,
        style: {
          ...state.style,
          display: 'block',
        },
      }
      return updatedState
    },
    remove: (state, action) => {
      console.log('remove triggered');
      const updatedState = state = {
        ...state,
        style: {
          ...state.style,
          display: 'none',
        },
      }
      return updatedState
    }
  },
})

// Action creators are generated for each case reducer function
export const { create, remove } = notificationSlice.actions

export default notificationSlice.reducer
