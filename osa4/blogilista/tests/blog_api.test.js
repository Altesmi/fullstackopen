const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const testBlogs = [{
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 2',
    url: 'http://url2.com',
    likes: 12,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
  }]

beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = testBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blogObject => blogObject.save())
    await Promise.all(promiseArray)
  })

describe.only('GET tests', () => {
    test('notes are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    })

    test('Number of blogs is same as initialBlogs length', async () => {
        const res = await api.get('/api/blogs')
        
        expect(res.body.length).toBe(testBlogs.length)
    })

    test('Henkilo 1 has authored a blog', async () => {
        const res = await api.get('/api/blogs')
        const authors = res.body.map(r => r.author)
        expect(authors).toContainEqual('Henkilo 1')
    })
})

afterAll(() => {
  server.close()
})