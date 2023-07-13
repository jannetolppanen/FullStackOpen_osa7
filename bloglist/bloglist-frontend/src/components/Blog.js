import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/BlogsSlice'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  // Blog css style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: 'red',
  }

  // returns true if blogpost belongs to logged in user
  const isBlogPostOwner = () => {
    if (!user) {
      return false
    }
    return blog.user.username === user.username
  }

  // Handles remove button clicks
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlogPost(blog.id)
    }
  }

  // Removes blogpost
  const removeBlogPost = (id) => {
    blogService.remove(id, user.token).then(() => {
      // setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(removeBlog({id}))
    })
  }

  // Toggle fullinfo visibility
  const handleView = () => {
    setVisible(!visible)
  }

  // Add like
  const handleLike = () => {
    const { id } = blog
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, blogToUpdate)
      .then(() => {
        dispatch(addLike({ id, blogToUpdate }))
      })
      .catch(() => {
        dispatch(
          create({ text: 'Blog was already removed from server', color: 'red' })
        )
        setTimeout(() => {
          dispatch(remove())
        }, 5000)
      })
  }

  // Shows more info about the blog
  const fullInfo = () => {
    return (
      <>
        {blog.url}
        <br />
        likes {blog.likes}{' '}
        <button onClick={handleLike} id="like-button">
          like
        </button>{' '}
        <br />
        {blog.user.name}
        <br />
        {isBlogPostOwner() && (
          <button
            style={removeButtonStyle}
            onClick={handleRemove}
            id="remove-button"
          >
            remove
          </button>
        )}
      </>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={handleView} id="view-button">
        view
      </button>{' '}
      <br />
      {visible && fullInfo()}
    </div>
  )
}

export default Blog
