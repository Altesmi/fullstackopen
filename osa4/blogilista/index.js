const http = require("http")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const config = require("./utils/config")

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)

const server = http.createServer(app)


server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
});

server.on("close", () => {
  blogsRouter.close()
})

module.exports = {
  app,server
}