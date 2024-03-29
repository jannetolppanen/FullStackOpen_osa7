import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog, addComment } from '../reducers/BlogsSlice'
import blogService from '../services/blogs'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const Blog = () => {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.login)
  const [comment, SetComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const blogs = useSelector(state => state.blogs)

  // Find the exact user
  const blog = blogs.find(user => user.id === id)

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
      dispatch(removeBlog({id}))
      navigate("/blogs")

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

  const handleCommentChange = (e) => {
    SetComment(e.target.value)
  }

  const submitComment = async (e) => {
    e.preventDefault()
    const id = blog.id
    const payload = {content: comment}
    await blogService.comment(id, payload)
    dispatch(addComment({ id, comment}))
    SetComment('')
  }


if (!blog) {
  return null
}

  return (
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}{' '}
        <Button variant="contained" color="primary" onClick={handleLike} id="like-button">
          like
        </Button>{' '}
        <br />
        Added by {blog.user.name}
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
        <h2>comments</h2>
        <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
        </ul>

        <form onSubmit={submitComment}>
          <TextField type="text" value={comment} onChange={handleCommentChange} placeholder='Give a comment' />
          <Button variant="contained" color="primary" type='submit'>add comment</Button>
        </form>




    </div>
  )
}

export default Blog
