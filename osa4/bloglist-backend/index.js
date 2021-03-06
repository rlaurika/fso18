const config = require('./utils/config')
const middleware = require('./utils/middleware')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database', config.mongoDb)
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

if (config.listenOnPort) {
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}