const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe.only('total likes', () => {
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

  const listWitNoBlogs = []

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

  test('when no blogs 0 is returned', () => {
    const result = listHelper.totalLikes(listWitNoBlogs);
    expect(result).toBe(0);
  })

  test('when dummy object is input 0 is returned', () => {
    const result = listHelper.totalLikes(listWithOnlyOneDummyObject);
    expect(result).toBe(0);
  })

  test('when one blog is input output is its likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(2);
  })

  test('when 2 blogs are input output is the sum of likes', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(14);
  })
})