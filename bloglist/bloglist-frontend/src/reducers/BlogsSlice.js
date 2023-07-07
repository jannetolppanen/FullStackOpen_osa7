import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const BlogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      const fetchedBlogs = action.payload
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      // returns fetched blogs as a test, does not sort. this needs to be fixed. just need to figure out why it complains about keys
      return fetchedBlogs
    },
    createNewBlog: (state, action) => {
      const newBlog = action.payload
      const newState = [...state, newBlog]
      return newState
    }
  },
})

export const { setAllBlogs, createNewBlog } = BlogsSlice.actions

export default BlogsSlice.reducer