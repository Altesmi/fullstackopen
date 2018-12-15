import React from 'react'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import Users from './components/Users'
import User from './components/User'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Menubar from './components/Menubar'
import NotificationBox from './components/Notification'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { notifySuccess, notifyError } from './reducers/notificationReducer'
import { usersInitialization, addBlogToUser } from './reducers/usersReducer'
import {
  blogsInitialization,
  blogCreation,
  blogDelete,
  increaseLikes
} from './reducers/blogReducer'
import { logIn, logOut, setUser } from './reducers/userReducer'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'


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
        `${this.props.user.name} logged in `,
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
    this.props.logOut()
  }

  postBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await this.props.blogCreation(this.state.newBlog)
      const userInfo = this.props.users.find(user => user.username === this.props.user.username)
      this.props.addBlogToUser(userInfo.id, newBlog)
      this.props.notifySuccess(
        `Succesfully posted blog titled "${
        this.props.blogs[this.props.blogs.length - 1].title
        }"`,
        5
      )
      this.setState({
        newBlog: {
          url: '',
          title: '',
          author: ''
        }
      })
    } catch (exception) {
      console.log(exception)
      this.props.notifyError('Error: Could not post blog!', 5)
    }
  }

  userById = id => this.props.users.find(u => u.id === id)
  blogById = id => this.props.blogs.find(b => b.id === id)

  componentDidMount = async () => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      await this.props.setUser(user)
    }

    await this.props.blogsInitialization()
    await this.props.usersInitialization()

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
      <div className="container">
        <Router>
          <div>

            {typeof (this.props.user.token) === 'undefined' ? (
              <div>
                <h1>Blog app</h1>
                <NotificationBox />
                {loginform()}
              </div>
            ) : (
                <div>
                  <div>
                    <Menubar />
                    <div style={{ float: 'right', height: '50px' }}>
                      {this.props.user.name} logged in
                    <Button type="submit" onClick={this.logout} bsSize="xsmall">logout</Button>
                    </div>
                  </div>
                  <div style={{ padding: '5px' }}> {' '} </div>
                  <NotificationBox />


                  <Route exact path="/" render={() => (
                    <div>
                      <Togglable buttonlabel="Add new blog">
                        <Blogform
                          blogFieldChanged={this.blogFieldChanged}
                          title={this.state.newBlog.title}
                          author={this.state.newBlog.author}
                          url={this.state.newBlog.url}
                          postBlog={this.postBlog}
                        />
                      </Togglable>
                      <Bloglist />
                    </div>)
                  } />
                  <Route exact path="/users" render={() => (<Users />)} />
                  <Route
                    exact
                    path="/users/:id"
                    render={({ match }) => (
                      <User user={this.userById(match.params.id)} />
                    )}
                  />
                  <Route
                    exact
                    path="/blogs/:id"
                    render={({ match, history }) => (
                      <Blog history={history} oneBlog={this.blogById(match.params.id)} />
                    )}
                  />
                </div>
              )}
          </div>
        </Router>
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
    setUser,
    addBlogToUser
  }
)(App)
