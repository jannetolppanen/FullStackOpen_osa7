import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/NotificationSlice'
import LoginSlice from './reducers/LoginSlice'
import BlogsSlice from './reducers/BlogsSlice'
import UserSlice from './reducers/UserSlice'

export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: BlogsSlice,
    login: LoginSlice,
    users: UserSlice
  },
})

export default store