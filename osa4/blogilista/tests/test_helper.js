const Blog = require('../models/blog')
const User = require('../models/user')

// Define some blog data
const listWithOneBlog = [
    {
      title: 'blogi 1',
      author: 'Henkilo 2',
      url: 'http://url1.com',
      likes: 2,
    }
  ]
  const listWithNoBlogs = []
  
  const listWithOnlyOneDummyObject = [{}]
  
  const listWithTwoBlogs = [{
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
  }
  ]
  
  const listWithTenBlogs = [{
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
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url1.com',
    likes: 2,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url1.com',
    likes: 2,
  },
  {
    title: 'blogi 1',
    author: 'Henkilo 3',
    url: 'http://url2.com',
    likes: 12,
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

  const initialUsers = [{
    name: "kayttaja yksi",
    username: "kayt1",
    adult: true,
    password: "ggpassu"
  },
  {
    name: "kayttaja kaksi",
    username: "kayt2",
    adult: false,
    password: "wppassu"
  }]

  const newUser = {
    name: "Uusi kayttaja",
    username: "uusis",
    adult: true,
    password: "passu"
  }

  const userWithAlreadyExistingUsername = {
    name: "kiva kayttaja",
    username: "kayt1",
    adult: true,
    password: "niinpaniin"
  }

  const userWithBadPassword = {
    name: "paha passu",
    username: "pahis",
    adult: false,
    password: "123"
  }

  const userWithoutAdultProperty = {
    name: "ei adultia",
    username: "adultis",
    password: "kivapassu234"
  }



const usersInDB = async () => {

  const users = await User.find({})

  return users.map(User.format)
}

  const blogsInDB = async () => {
    const blogs = await Blog.find({})

    return blogs.map(Blog.format)
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
      initialUsers,
      userWithAlreadyExistingUsername,
      userWithBadPassword,
      userWithoutAdultProperty,
      newUser,
      format,
      blogsInDB,
      formatUser,
      usersInDB

  }