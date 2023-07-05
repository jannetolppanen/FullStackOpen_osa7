import { configureStore } from '@reduxjs/toolkit'
import LeftCounterSlice from './reducers/LeftCounterSlice'
import RightCounterSlice from './reducers/RightCounterSlice'
import notificationSlice from './reducers/NotificationSlice'

export const store = configureStore({
  reducer: {
    leftCounter : LeftCounterSlice,
    rightCounter : RightCounterSlice,
    notification: notificationSlice,
  },
})

export default store