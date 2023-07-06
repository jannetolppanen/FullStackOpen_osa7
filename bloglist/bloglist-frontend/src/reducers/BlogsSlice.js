import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const BlogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      const fetchedBlogs = action.payload
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    },
  },
})

export const { setAllBlogs } = BlogsSlice.actions

export default BlogsSlice.reducer