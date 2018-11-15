const listHelper = require('../utils/list_helper')

describe.skip("List helper tests", () => {
test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {


  test('when no blogs 0 is returned', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when dummy object is input 0 is returned', () => {
    const result = listHelper.totalLikes(listWithOnlyOneDummyObject)
    expect(result).toBe(0)
  })

  test('when one blog is input output is its likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(2)
  })

  test('when 2 blogs are input output is the sum of likes', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(14)
  })
})

describe('favorite blog', () => {

  test('when no blogs empty object is returned', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs);
    expect(result).toMatchObject({})
  })

  test('when dummy object is input empty object is returned',() => {
    const result = listHelper.favoriteBlog(listWithOnlyOneDummyObject);
    expect(result).toMatchObject({})
  })

  test('when 1 blog is input the same blog is returned', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toMatchObject(listWithOneBlog[0])
  })

  test('when multiple blogs are input the one with most likes is returned', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    expect(result).toMatchObject(listWithTwoBlogs[1])
  })

})

describe('most blogs', () => {
  test('when no blogs empty object is returned', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs);
    expect(result).toMatchObject({})
  })

  test('when dummy object is input empty object is returned',() => {
    const result = listHelper.mostBlogs(listWithOnlyOneDummyObject);
    expect(result).toMatchObject({})
  })

  test('when 1 blog is input the author of the blog is returned with number of blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toMatchObject({author: "Henkilo 2", blogs: 1})
  })

  test('when multiple blogs are input the name which has the highest blog count is returned together with the blog count', () => {
    const result = listHelper.mostBlogs(listWithTenBlogs);
    expect(result).toMatchObject({author: "Henkilo 3", blogs: 5})
  })
})

describe('most blogs', () => {
  test('when no blogs empty object is returned', () => {
    const result = listHelper.mostLikes(listWithNoBlogs);
    expect(result).toMatchObject({})
  })

  test('when dummy object is input empty object is returned',() => {
    const result = listHelper.mostLikes(listWithOnlyOneDummyObject);
    expect(result).toMatchObject({})
  })

  test('when 1 blog is input the author of the blog is returned with number of blogs', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toMatchObject({author: "Henkilo 2", likes: 2})
  })

  test('when multiple blogs are input the name which has the highest blog count is returned together with the blog count', () => {
    const result = listHelper.mostLikes(listWithTenBlogs);
    expect(result).toMatchObject({author: "Henkilo 3", likes: 40})
  })
})
})
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