if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let mongoUser = process.env.MONGO_USER
let mongoPass = process.env.MONGO_PASS
let mongoDb = process.env.MONGO_URL
let listenOnPort = true

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUser = process.env.TEST_MONGO_USER
  mongoPass = process.env.TEST_MONGO_PASS
  mongoDb = process.env.TEST_MONGO_URL
  listenOnPort = false
}

let mongoUrl = 'mongodb://'+mongoUser+':'+mongoPass+'@'+mongoDb

module.exports = {
  mongoUrl,
  mongoDb,
  port,
  listenOnPort
}