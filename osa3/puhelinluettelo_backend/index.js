const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('content', function getContent (req) {
  return JSON.stringify(req.body)
})

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

// Get all people in the phonebook
app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people.map(Person.format))
    })
})

// Get person by id
app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

// Print information on phonebook
app.get('/info', (req, res) => {
  const date = new Date()

  Person
    .find({})
    .then(people => {
      const page = `
      <!DOCTYPE html>
      <html lang="fi">
        <head>
          <meta charset="utf-8">
          <title>Puhelinluettelon info</title>
        </head>
        <body>
          <p>puhelinluettelossa ${people.length} henkilön tiedot</p>
          <p>${date}</p>
        </body>
      </html>
      `
      res.send(page)
    })
})

// Add new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }

  Person
    .find({ name: body.name })
    .then(person => {
      if (person.length >= 1) {
        return response.status(409).json(
          { error: 'a person called '+body.name+' already exists in the phonebook' }
        )
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })

        person
          .save()
          .then(savedPerson => {
            response.json(Person.format(savedPerson))
          })
      }
    })
})

// Modify existing person
app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

// Delete person by id
app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(() => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})