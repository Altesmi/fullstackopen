const Blog = require('../models/blog')

// Define some blog data
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'blogi 1',
      author: 'Henkilo 2',
      url: 'http://url1.com',
      likes: 2,
      __v: 0
    }
  ]
  const listWithNoBlogs = []
  
  const listWithOnlyOneDummyObject = [{}]
  
  const listWithTwoBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 2',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  }
  ]
  
  const listWithTenBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 2',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 2',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 1',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url1.com',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
    __v: 0
  }
  ]

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


  const format = (blog) => {
      return {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          likes: blog.likes,
          id: blog._id
      }
  }

  const blogsInDB = async () => {
    const blogs = await Blog.find({})

    return blogs.map(format)
  }

  module.exports = {
      newBlog,
      newBlogWithoutLikes,
      newBlogWithoutTitle,
      newBlogWithoutUrl,
      testBlogs,
      listWithNoBlogs,
      listWithOneBlog,
      listWithOnlyOneDummyObject,
      listWithTenBlogs,
      listWithTwoBlogs,
      format,
      blogsInDB

  }