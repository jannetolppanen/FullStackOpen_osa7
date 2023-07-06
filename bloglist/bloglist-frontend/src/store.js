import { configureStore } from '@reduxjs/toolkit'
import LeftCounterSlice from './reducers/LeftCounterSlice'
import RightCounterSlice from './reducers/RightCounterSlice'
import notificationSlice from './reducers/NotificationSlice'
import BlogsSlice from './reducers/BlogsSlice'

export const store = configureStore({
  reducer: {
    leftCounter : LeftCounterSlice,
    rightCounter : RightCounterSlice,
    notification: notificationSlice,
    blogs: BlogsSlice
  },
})

export default store