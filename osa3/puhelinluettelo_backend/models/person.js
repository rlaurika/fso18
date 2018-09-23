const mongoose = require('mongoose')

const mongo_user = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASS
const mongo_url = process.env.MONGO_URL

const url = 'mongodb://'+mongo_user+':'+mongo_pass+'@'+mongo_url

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person