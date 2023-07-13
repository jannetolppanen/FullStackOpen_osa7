import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create, remove } from '../reducers/NotificationSlice'
import { setAllBlogs, createNewBlog } from '../reducers/BlogsSlice'
import blogService from '../services/blogs'


const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  // Reference to Togglable
  const blogFormRef = useRef()

  const handleCreateNewBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  const newBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(
      create({
        text: `${blogObject.title} by ${blogObject.author} added`,
        color: 'green',
      })
    )
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

      // Adds new blogs to redux
      const addBlog = async (blogObject) => {
        try {
          blogService.create(blogObject).then((result) => {
            dispatch(createNewBlog(result))
          })
        } catch (error) {
          if (error.response && error.response.status === 400) {
            dispatch(
              create({
                text: 'Error, bad request',
                color: 'red',
              })
            )
            setTimeout(() => {
              dispatch(remove())
            }, 5000)
          }
        }
      }

  return (
    <>
      <div>
        <form onSubmit={newBlog}>
          <div>
            <h2>create new blog</h2>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              data-testid="titleInput"
              id="title-input"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              data-testid="authorInput"
              id="author-input"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              data-testid="urlInput"
              id="url-input"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>

          <button type="submit" data-testid="submitButton" id="submit-button">
            create
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateBlogForm
