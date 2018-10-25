const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");

// const mongoose = require("mongoose");

// const Blog = mongoose.model("Blog", {
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// });

//module.exports = Blog;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/blogs",blogsRouter)

//require("dotenv").config();

//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });




const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
