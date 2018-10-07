const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const mongo_user = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASS
const mongo_url = process.env.MONGO_URL

const url = 'mongodb://'+mongo_user+':'+mongo_pass+'@'+mongo_url

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.statics.format = function (person) {
  return ({
    name: person.name,
    number: person.number,
    id: person._id
  })
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person