const blogsRouter = require("express").Router();
const Blog = require('../models/blog');

blogsRouter.get("/", (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs.map(blog=>Blog.format(blog)));
    });
  });
  
  blogsRouter.post("/", (request, response) => {
    const blog = new Blog(request.body);
  
    blog.save().then(result => {
      response.status(201).json(Blog.format(result));
    });
  });

  module.exports = blogsRouter