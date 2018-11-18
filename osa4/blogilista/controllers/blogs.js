const blogsRouter = require("express").Router();
const Blog = require('../models/blog');

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs.map(blog=>Blog.format(blog)))
  });
  
  blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
  
    //if blog does not contain title or url return 400

    if(typeof(blog.title) === 'undefined' || typeof(blog.url) === 'undefined') {
      return response.status(400).json({ Error: 'Content and URL need to be speified' })
    }

    //if there is no likes field, likes is set to 0

    if(typeof(blog.likes) === 'undefined') {
      blog.likes = 0
    }
    await blog.save()

    return response.status(201).json(Blog.format(blog))
    // blog.save().then(result => {
    //   response.status(201).json(Blog.format(result));
    // });

  });

  blogsRouter.close = function () {
    Blog.close()
  }

  module.exports = blogsRouter