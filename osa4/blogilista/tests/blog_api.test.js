const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {format, blogsInDB, testBlogs, newBlog, newBlogWithoutLikes, newBlogWithoutTitle, newBlogWithoutUrl} = require('./test_helper')

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

describe('Blog post tests', () => {

  test('server returns status 201 when blog is posted', async () => {
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201);
  })

  test('A blog is added to the DB', async () => {
    const blogsBefore = await blogsInDB()

    await api.post('/api/blogs')
    .send(newBlog)

    const blogsAfter = await blogsInDB()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  })

  test('The specific blog is added', async () => {
    await api.post('/api/blogs')
    .send(newBlog)

    const res = await blogsInDB()
 
    const titles = res.map(r => r.title)

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

describe('Blog delete tests', () => {

  test('A specific blog is deleted', async () => {
    blogsBefore = await blogsInDB()
    blogToBeDeleted = blogsBefore[1]
    
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`)
    .expect(204)

    blogsAfter = await blogsInDB();

    blogsAfterIDs = blogsAfter.map(blog => blog.id)
    expect(blogsAfterIDs).not.toContainEqual(blogToBeDeleted.id)
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)

  })

  test('A wrong id returns 400', async () => {
    await api.delete(`/api/blogs/1`)
    .expect(400)
  })
})

describe.only('Blog update tests', () => {

  test('A specific blog can be updated', async () => {

    blogsBefore = await blogsInDB()

    blogToBeUpdated = blogsBefore[1]
    blogToBeUpdated.likes = 555

    const result = await api.put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated)

    blogsAfter = await blogsInDB()

    expect(blogsAfter[1].likes).toBe(blogToBeUpdated.likes)

  })

  test('A blog without valid blog fields can not be updated', async () => {

    blogsBefore = await blogsInDB()

    blogToBeUpdated = {
      id: blogsBefore[1].id
    }

    await api.put(`/api/blogs/${blogToBeUpdated.id}`)
    .send(blogToBeUpdated)
    .expect(400)

  })

  test('A blog with wrong id can not be updated', async () => {

    blogsBefore = await blogsInDB()

    await api.put('/api/blogs/1').expect(500)
    .send(blogsBefore[1])
  })
})

afterAll(() => {
  server.close()
})