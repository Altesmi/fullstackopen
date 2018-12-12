import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'
const blog = {
    author: 'testaaja',
    title: 'Testaaminen 101',
    url: 'simpleblog.net',
    likes: 0
}
const mockHandler = jest.fn()

describe.skip('<SimpleBlog />', () => {
    it('renders content', () => {        
        const simpleBlog = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
        const contentDiv = simpleBlog.find('.content')
        const likediv = simpleBlog.find('.likediv')
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.title)
        expect(likediv.text()).toContain('blog has 0 likes')
    })

    it('Two button cliks are recorded', () => {
        const simpleBlog = shallow(<SimpleBlog blog={blog}
             onClick={mockHandler} />)

        const button = simpleBlog.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})