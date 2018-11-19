const blogsRouter = require("express").Router();
const Blog = require('../models/blog');
const User = require('../models/user')

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
  .populate('user',{username: 1, name: 1})
  response.json(blogs.map(blog=>Blog.format(blog)))
  });
  
  blogsRouter.post("/", async (request, response) => {
    try {
      const blog = new Blog(request.body);
  
    //if blog does not contain title or url return 400

    if(typeof(blog.title) === 'undefined' || typeof(blog.url) === 'undefined') {
      return response.status(400).json({ Error: 'Content and URL need to be speified' })
    }

    //if there is no likes field, likes is set to 0

    if(typeof(blog.likes) === 'undefined') {
      blog.likes = 0
    }

    // get the user
    const users = await User.find({})
    const user = users[0]

    blog.user = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    return response.status(201).json(Blog.format(blog))

  } catch(exception) {
    console.log(exception)
    return response.status(500).json({error: "Something went wrong"})
  }

  });

  blogsRouter.delete('/:id', async (request,response) => {
    try {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()

    } catch(exception) {
      console.log(exception)
      return response.status(400).json({ error: "Could not delete. Probably bad ID"})
    }


  })

blogsRouter.put('/:id', async (request, response) => {

  try {

    const updatedBlog = {
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
      likes: request.body.likes
    }

    // check that the updatedBlog is a valid blog
    if(typeof(updatedBlog.title) === 'undefined' || 
    typeof(updatedBlog.url) === 'undefined' ||
    typeof(updatedBlog.author) === 'undefined' ||
    typeof(updatedBlog.likes) === 'undefined') {
      return response.status(400).json({ error: "A blog must contain author, title, url and likes"})
    }

    const result =  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})

    return response.json(Blog.format(result.updatedBlog))

  } catch (exception) {

      return response.status(500).send({error: "Something went wrong"})
  }
  

})

  blogsRouter.close = function () {
    Blog.close()
  }

  module.exports = blogsRouter