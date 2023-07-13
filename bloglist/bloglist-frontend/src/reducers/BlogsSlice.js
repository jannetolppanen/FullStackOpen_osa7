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
    createNewBlog: (state, action) => {
      const newBlog = action.payload
      const newState = [...state, newBlog]
      return newState
    },
    addLike: (state, action) => {
      const { id, blogToUpdate } = action.payload
      const updatedState = state.map((blog) => (blog.id !== id ? blog : blogToUpdate))
      const sortedState = updatedState.sort((a, b) => b.likes - a.likes)
      return sortedState
    },
    removeBlog: (state, action) => {
      const { id } = action.payload
      const newState = state.filter((blog) => blog.id !== id )
      return newState
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload
      const blogToComment = state.find((blog) => blog.id === id)
      blogToComment.comments.push({content: comment})
      
      // we can return undefined here because immer deals with this under the hood
      return undefined
    }
  },
})

export const { setAllBlogs, createNewBlog, addLike, removeBlog, addComment } = BlogsSlice.actions

export default BlogsSlice.reducer