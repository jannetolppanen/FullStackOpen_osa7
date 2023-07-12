import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload
      return user
    },
    logout: (state, action) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions

export default UserSlice.reducer