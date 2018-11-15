const blogsRouter = require("express").Router();
const Blog = require('../models/blog');

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs.map(blog=>Blog.format(blog)))
  });
  
  blogsRouter.post("/", (request, response) => {
    const blog = new Blog(request.body);
  
    blog.save().then(result => {
      response.status(201).json(Blog.format(result));
    });
  });

  blogsRouter.close = function () {
    Blog.close()
  }

  module.exports = blogsRouter