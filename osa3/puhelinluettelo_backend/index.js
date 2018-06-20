const express = require('express')
const app = express()

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/api/persons', (request, response) => {
  console.log('Request from the following agent: ', request.get('User-Agent'))
  response.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const page = `
    <!DOCTYPE html>
    <html lang="fi">
      <head>
        <meta charset="utf-8">
        <title>Puhelinluettelon info</title>
      </head>
      <body>
        <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${date}</p>
      </body>
    </html>
  `

  res.send(page)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})