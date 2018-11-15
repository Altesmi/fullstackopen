const mongoose = require("mongoose");
const config = require("../utils/config")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(
  config.mongoUrl,
  { useNewUrlParser: true }
);

var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.statics.format = function(blog) {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  };
};

const Blog = mongoose.model("Blog", blogSchema);

Blog.close = function() {
  mongoose.connection.close()
}

module.exports = Blog;
