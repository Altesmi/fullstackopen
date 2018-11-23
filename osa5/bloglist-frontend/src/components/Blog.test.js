import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
const newBlog = {
    author: 'testaaja',
    title: 'Testaaminen 101',
    url: 'simpleblog.net',
    likes: 4,
    user: {
        username: 'testihenkilö',
        name: 'blogin kirjoittaja'
    }
}

const newUser = {
    username: 'testaaja',
    name: 'Testien tekijä'
}
const mockHandler = jest.fn()

describe.skip('<Blog />', () => {
    it('renders only blogName first', () => {        
        const blog  = shallow(<Blog blog={newBlog} 
            increaseLikes = {mockHandler}
            deleteBlog = {mockHandler}
            user = {newUser} />)
        const blogInfoDiv = blog.find('.blogName')
        expect(blogInfoDiv.text()).toContain(`${newBlog.title} ${newBlog.author}`)
    })

    it('after clicking the show more button other info is rendered', () => {
        const blog  = shallow(<Blog blog={newBlog} 
            increaseLikes = {mockHandler}
            deleteBlog = {mockHandler}
            user = {newUser} />)
        const showMoreButton = blog.find('button');
        showMoreButton.simulate('click')
        
        const urlDiv = blog.find('.url')
        expect(urlDiv.text()).toContain(newBlog.url)

        const likesDiv = blog.find('.likes')
        expect(likesDiv.text()).toContain(`Likes: ${newBlog.likes}`)

        const addedInfoDiv = blog.find('.addedInfo')
        expect(addedInfoDiv.text()).toContain(`Added by ${newBlog.user.username}`)
    })
})