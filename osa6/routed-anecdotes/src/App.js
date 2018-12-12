import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel,
  PageHeader
} from 'react-bootstrap'

const Menu = () => {
  const linkItemSpacing = {
    padding: '2%',
    display: 'inline'
  }
  const linkStyle = {
    color: 'green',
    fontWeight: 'bold'
  }

  const activeLinkStyle = {
    color: 'black',
    border: '1 px solid black',
    backgroundColor: 'darkkhaki',
    padding: '5px'
  }

  const menuBarStyle = {
    border: '1px solid black',
    width: '75%',
    backgroundColor: 'moccasin',
    textAlign: 'center',
    padding: '10px'
  }

  return (
    <div style={menuBarStyle}>
      <div>
        <div style={linkItemSpacing}>
          <NavLink style={linkStyle} activeStyle={activeLinkStyle} exact to="/">
            anecdotes
          </NavLink>
        </div>
        <div style={linkItemSpacing}>
          <NavLink
            style={linkStyle}
            activeStyle={activeLinkStyle}
            exact
            to="/create"
          >
            create new
          </NavLink>
        </div>
        <div style={linkItemSpacing}>
          <NavLink
            style={linkStyle}
            activeStyle={activeLinkStyle}
            exact
            to="/about"
          >
            about
          </NavLink>
        </div>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem
          key={anecdote.id}
          bsStyle="warning"
          style={{ width: '74%' }}
        >
          <NavLink exact to={`/anecdotes/${anecdote.id}`}>
            {' '}
            {anecdote.content}{' '}
          </NavLink>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <div>
      has {anecdote.votes} votes <br />
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row>
        <Col xs={10} md={4}>
          <p>According to Wikipedia:</p>

          <p>
            <em>
              An anecdote is a brief, revealing account of an individual person
              or an incident. Occasionally humorous, anecdotes differ from jokes
              because their primary purpose is not simply to provoke laughter
              but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk
              or trait, to communicate an abstract idea about a person, place,
              or thing through the concrete details of a short narrative. An
              anecdote is "a story with a point."
            </em>
          </p>

          <p>
            <b>
              Software engineering is full of excellent anecdotes, at this app
              you can find the best and add more.
            </b>
          </p>
        </Col>
        <Col>
          <img
            src={require('./Grace_M._Hopper.jpg')}
            alt="Grace M. Hopper"
            className="img-rounded"
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <Panel bsStyle="success" style={{ textAlign: 'center', width: '74%' }}>
      <Panel.Heading>
        Anecdote app for{' '}
        <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
          Full Stack -sovelluskehitys
        </a>
        .
      </Panel.Heading>
      <Panel.Body>
        See{' '}
        <a href="https://github.com/mluukkai/routed-anecdotes">
          https://github.com/mluukkai/routed-anecdotes
        </a>{' '}
        for the source code.
      </Panel.Body>
    </Panel>
  </div>
)

const Notification = ({ msg }) => {
  const notificationStyle = {
    border: '2px solid gray',
    backgroundColor: 'palegreen',
    borderRadius: '5px',
    margin: '20px 20px 10px 20px',
    padding: '10px',
    width: '50%'
  }

  if (msg === '') {
    return <div />
  } else {
    return <div style={notificationStyle}>{msg}</div>
  }
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notification(`A new anecdote ${this.state.content} created!`)
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup style={{ width: '74%' }}>
            <ControlLabel>content</ControlLabel>
            <FormControl
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />

            <ControlLabel>author</ControlLabel>
            <FormControl
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />

            <ControlLabel>url for more info</ControlLabel>
            <FormControl
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <p />
            <Button bsStyle="success" type="submit">
              create
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  notify = msg => {
    this.setState({ notification: msg })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id)

  vote = id => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a))

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <div>
          <PageHeader style={{padding: '0px 0px 0px 25%', fontFamily: 'Gamja Flower'}}>
           Software anecdotes
          </PageHeader>
          <Router>
            <div>
              <Menu />

              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <Notification msg={this.state.notification} />
                    <AnecdoteList anecdotes={this.state.anecdotes} />
                  </div>
                )}
              />
              <Route
                exact
                path="/create"
                render={({ history }) => (
                  <CreateNew
                    history={history}
                    addNew={this.addNew}
                    notification={this.notify}
                  />
                )}
              />
              <Route exact path="/about" render={() => <About />} />
              <Route
                exact
                path="/anecdotes/:id"
                render={({ match }) => (
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />
                )}
              />
            </div>
          </Router>
          <p />

          <Footer />
        </div>
      </div>
    )
  }
}

export default App
