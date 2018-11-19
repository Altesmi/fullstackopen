const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

 usersRouter.get("/", async (request, response) => {
  let users = await User.find({})
  .populate('blogs',{author: 1, title: 1, url: 1, likes: 1});
  response.json(users.map(user => User.format(user)))
 })

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body

    // check that the user is valid

    const allUsers = await User.find({})

    const sameUsers = allUsers.find(user => user.username === body.username)

    if(typeof(sameUsers) !== 'undefined') {
        return response.status(400).json({error: "Username must be unique"})
    }

    if(body.password.length<4) {
        return response.status(400).json({error: "Password must be at least 3 letters"})
    }

    if(typeof(body.adult) === 'undefined') {
      body.adult = true
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        adult: body.adult,
        passwordHash
    })
    
    await user.save();
    
    return response.status(201).json(User.format(user));
  } catch (exception) {
    console.log(exception);
    return response.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = usersRouter