import React from 'react'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import NotificationBox from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      error: null,
      success: null,
      blogs: [],
      newBlog: {
        url: '',
        title: '',
        author: ''
      }
    }
  }

  loginBaseUrl = '/api/login'

  loginFieldChanged = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  blogFieldChanged = (event) => {
    let newBlogChange = this.state.newBlog
    newBlogChange[event.target.name] = event.target.value
    this.setState({ newBlog: newBlogChange })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({
        username: '',
        password: '',
        user
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ success: `Succesfully logged in ${this.state.user.name}` })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    } catch (exception) {

      this.setState({ error: 'Wrong username or password' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  likeButtonPressed = async (blog) => {
    try {
    const result = await blogService.increaseLike(blog)

    let newBlogs = this.state.blogs
    newBlogs[newBlogs.findIndex(b => b.id === blog.id)] = result
    this.setState({blogs: newBlogs})
    } catch(exception) {
      console.log(exception)
    }
  }

  deleteBlogButtonPressed = async (id) => {
    console.log(id)
    try {
    await blogService.deleteBlog(id)

    let newBlogs = this.state.blogs
    newBlogs = newBlogs.filter(b => b.id !== id)
    this.setState({blogs: newBlogs})
    } catch(exception) {
      console.log(exception)
    }
  }

  postBlog = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create(this.state.newBlog)
      let oldBlogs = this.state.blogs
      oldBlogs.push(result)
      this.setState({
        newBlog: { title: '', author: '', url: '' },
        blogs: oldBlogs
      })

      const lastBlog = this.state.blogs[this.state.blogs.length - 1]
      this.setState({ success: `Succesfully posted blog titled ${lastBlog.title}` })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      this.setState({ error: 'Could not post blog' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({ user: null })
    blogService.setToken('')
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  render() {
    const loginform = () => (
      <div className='loginForm'>
        <Loginform
          username={this.state.username}
          password={this.state.password}
          loginFieldChanged={this.loginFieldChanged}
          login={this.login}
        />
      </div>
    )


    return (
      <div>
        <NotificationBox
          msg={this.state.error}
          classname='errorNotification' />
        <NotificationBox
          msg={this.state.success}
          classname='successNotification' />
        {this.state.user === null ? loginform() :
          <div>
            <p>{this.state.user.name} logged in
                    <button type='submit' onClick={this.logout}>logout</button></p>
            <h2>blogs</h2>
            <Togglable buttonlabel="Add new blog">
              <Blogform
                blogFieldChanged={this.blogFieldChanged}
                title={this.state.newBlog.title}
                author={this.state.newBlog.author}
                url={this.state.newBlog.url}
                postBlog={this.postBlog}
              />
            </Togglable>
            {this.state.blogs.sort((a,b) => //sort the blogs before render
              b.likes-a.likes
            )
            .map(blog =>
              <Blog key={blog.id} 
              blog={blog} 
              user={this.state.user}
              deleteBlog = { () => this.deleteBlogButtonPressed(blog.id)}
              increaseLikes={() => this.likeButtonPressed(blog)} />)}
          </div>
        }
      </div>
    );
  }
}

export default App;
