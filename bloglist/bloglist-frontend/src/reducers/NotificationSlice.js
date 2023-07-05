import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  style: {
    backgroundColor: '#f8f8f8',
    border: '1px solid grey',
    borderRadius: '4px',
    padding: '10px',
    color: 'white',
    fontSize: '24px',
    display: 'none'
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
          backgroundColor: color
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
