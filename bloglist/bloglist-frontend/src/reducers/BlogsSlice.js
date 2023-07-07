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
    addlike: (state, action) => {
      //
    },
    removeBlog: (state, action) => {
      //
    }
  },
})

export const { setAllBlogs, createNewBlog, addlike, removeBlog } = BlogsSlice.actions

export default BlogsSlice.reducer

// const addLike = (id) => {
//   const blogObject = blogs.find((b) => b.id === id)
//   const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }

//   blogService
//     .update(id, changedBlog)
//     .then(() => {
//       setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)))
//     })
//     .catch(() => {
//       dispatch(
//         create({
//           text: 'Blog was already removed from server',
//           color: 'red',
//         })
//       )
//       setTimeout(() => {
//         dispatch(remove())
//       }, 5000)
//       setBlogs(blogs.filter((b) => b.id !== id))
//     })
// }