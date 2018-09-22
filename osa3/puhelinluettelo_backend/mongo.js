const mongoose = require('mongoose')

const mongo_url = process.env.MONGO_URL
const mongo_user = process.env.MONGO_USER
const mongo_pass =  process.env.MONGO_PASS

const url = 'mongodb://'+mongo_user+':'+mongo_pass+'@'+mongo_url

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv[2] && process.argv[3]) {
  const name = process.argv[2]
  const number = process.argv[3]
  add_person(name, number)
} else {
  get_people()
}

function add_person(name, number) {
  mongoose.connect(url, { useNewUrlParser: true })

  const person = new Person({
    name: name,
    number: number
  })

  console.log('lisätään henkilö '+name+' numero '+number+' luetteloon');

  person
    .save()
    .then(response => {
      mongoose.connection.close()
    })
}

function get_people() {
  mongoose.connect(url, { useNewUrlParser: true })

  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo:')
      result.forEach(person => {
        console.log(person.name+' '+person.number);
      })
      mongoose.connection.close()
    })
}