import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const BlogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      const fetchedBlogs = action.payload
      return fetchedBlogs
    },
  },
})

export const { setAllBlogs } = BlogsSlice.actions

export default BlogsSlice.reducer