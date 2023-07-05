import { configureStore } from '@reduxjs/toolkit'
import LeftCounterSlice from './reducers/LeftCounterSlice'
import RightCounterSlice from './reducers/RightCounterSlice'

export const store = configureStore({
  reducer: {
    leftCounter : LeftCounterSlice,
    rightCounter : RightCounterSlice
  },
})

export default store