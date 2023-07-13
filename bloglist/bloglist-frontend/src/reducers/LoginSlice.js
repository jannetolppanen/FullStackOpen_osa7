import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const LoginSlice = createSlice({
  name: 'login',
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
export const { login, logout } = LoginSlice.actions

export default LoginSlice.reducer