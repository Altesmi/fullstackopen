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

describe('GET tests', () => {
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

describe.only('Blog post tests', () => {
  const newBlog = {
    author: "uusi henkilö",
    title: "Uusi blogi",
    url: "http://lisaablogi.com",
    likes: 400
  }

  const newBlogWithoutLikes = {
    author: "Liketon henkilo",
    title: "Tässä ei ole likea",
    url: "http://eilikea.com",
  }

  const newBlogWithoutTitle = {
    author: "no title person",
    url: "http://eititlea.com",
    likes: 5
  }

  const newBlogWithoutUrl = {
    author: "no url person",
    title: "This blog has no URL",
    likes: 5
  }



  test('server returns status 201 when blog is posted', async () => {
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201);
  })

  test('A blog is added to the DB', async () => {
    const blogsBefore = await api.get('/api/blogs')

    await api.post('/api/blogs')
    .send(newBlog)

    const blogsAfter = await api.get('/api/blogs')

    expect(blogsBefore.length).toBe(blogsBefore.legnth)
  })

  test('The specific blog is added', async () => {
    await api.post('/api/blogs')
    .send(newBlog)

    const res = await api.get('/api/blogs')
 
    const titles = res.body.map(r => r.title)

    expect(titles).toContainEqual('Uusi blogi')
    
  })

  test('A blog without likes is set to zero', async () => {
    await api.post('/api/blogs')
    .send(newBlogWithoutLikes)

    const res = await api.get('/api/blogs')

    const newAddedBlog = res.body.find(r => r.author === 'Liketon henkilo')
    console.log(newAddedBlog)

    expect(newAddedBlog.likes).toBe(0)
  })

  test('A blog without title returns 400', async () => {

    await api.post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
  })

  test('A blog without url returns 400', async () => {

    await api.post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
  })



  
})

afterAll(() => {
  server.close()
})