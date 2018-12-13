import React from 'react'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import NotificationBox from './components/Notification'
import Togglable from './components/Togglable'
//import blogService from './services/blogs'
//import loginService from './services/login'
import { notifySuccess, notifyError } from './reducers/notificationReducer'
import { usersInitialization } from './reducers/usersReducer'
import {
  blogsInitialization,
  blogCreation,
  blogDelete,
  increaseLikes
} from './reducers/blogReducer'
import { logIn, logOut, setUser } from './reducers/userReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //user: null,
      username: '',
      password: '',
      newBlog: {
        url: '',
        title: '',
        author: ''
      }
    }
  }

  loginBaseUrl = '/api/login'

  loginFieldChanged = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  blogFieldChanged = event => {
    let newBlogChange = this.state.newBlog
    newBlogChange[event.target.name] = event.target.value
    this.setState({ newBlog: newBlogChange })
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = {
        username: this.state.username,
        password: this.state.password
      }
      await this.props.logIn(user)
      this.props.notifySuccess(
        `Succesfully loggend in ${this.props.user.name}`,
        5
      )
      this.setState({
        username: '',
        password: ''
      })
    } catch (exception) {
      console.log(exception)
      this.props.notifyError(`Wrong username or password`, 5)
    }
  }

  logout = event => {
    event.preventDefault()
    // window.localStorage.removeItem('loggedBlogAppUser')
    // this.setState({ user: null })
    // blogService.setToken('')
    this.props.logOut()
  }

  likeButtonPressed = async blog => {
    try {
      await this.props.increaseLikes(blog)
    } catch (exception) {
      console.log(exception)
    }
  }

  deleteBlogButtonPressed = async id => {
    try {
      await this.props.blogDelete(id)
    } catch (exception) {
      console.log(exception)
    }
  }

  postBlog = async event => {
    event.preventDefault()
    try {
      await this.props.blogCreation(this.state.newBlog)
      this.props.notifySuccess(
        `Succesfully posted blog titled "${
          this.props.blogs[this.props.blogs.length - 1].title
        }"`,
        5
      )
    } catch (exception) {
      console.log(exception)
      this.props.notifyError('Error: Could not post blog!', 5)
    }
  }

  componentDidMount = async () => {
    await this.props.blogsInitialization()
    await this.props.usersInitialization()
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      await this.props.setUser(user)
      //this.setState({ user })
      //blogService.setToken(user.token)
    }
  }

  render() {
    const loginform = () => (
      <div className="loginForm">
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
        <NotificationBox />

        {typeof(this.props.user.token) === 'undefined' ? (
          loginform()
        ) : (
          <div>
            <p>
              {this.props.user.name} logged in
              <button type="submit" onClick={this.logout}>
                logout
              </button>
            </p>
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
            {this.props.blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={this.state.user}
                  deleteBlog={() => this.deleteBlogButtonPressed(blog.id)}
                  increaseLikes={() => this.likeButtonPressed(blog)}
                />
              ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    notifySuccess,
    notifyError,
    usersInitialization,
    blogsInitialization,
    blogCreation,
    blogDelete,
    increaseLikes,
    logIn,
    logOut,
    setUser
  }
)(App)
