const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoUser = process.env.MONGO_USER
const mongoPass = process.env.MONGO_PASS
const mongoUrl = process.env.MONGO_URL

const mongoConnectionUrl = 'mongodb://'+mongoUser+':'+mongoPass+'@'+mongoUrl
mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true })

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})