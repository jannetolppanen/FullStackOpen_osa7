import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/NotificationSlice'
import UserSlice from './reducers/UserSlice'
import BlogsSlice from './reducers/BlogsSlice'

export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: BlogsSlice,
    user: UserSlice
  },
})

export default store