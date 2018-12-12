import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe.skip('When user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        it('renders only login for when not logged in', () => {
            app.update()

            const inputfields = app.find('input')
            const blogFields = app.find(Blog)
            expect(inputfields.length).toBe(2)
            expect(blogFields.length).toBe(0) // expect no blogs to be rendered

        })
    })

    describe('When user is logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'testaaja',
                token: '1111111111111111111',
                name: 'Testien tekija'
            }

            localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            app = mount(<App />)
        })

        it('renders blogs when user is logged in', () => {
            app.update()

            const blogFields = app.find(Blog)
            expect(blogFields.length).toBe(3)

        })
    })
})