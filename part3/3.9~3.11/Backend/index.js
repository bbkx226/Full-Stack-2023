const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-1234567"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Brandon\'s backend</h1>')
})

app.get('/info', (req, res) => {
  const numberOfPeople = generateId()
  const time = new Date()
  res.send(`
  <p>Phonebook has info for ${numberOfPeople} people</p>
  <h3>${time}</h3>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(x => x.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
  })

app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)
persons = persons.filter(x => x.id !== id)

res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'The name or number is missing'
    })
  } else if ((persons.map(x => x.name === body.name)).includes(true)) {
    return res.status(400).json({
      error: 'The name already exists in the phonebook'
    })
    
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
  app.use(morgan('body'))

})
