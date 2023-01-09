require('dotenv').config('')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const Book = require('./models/book')

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))
app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  // if (!body.name || !body.number) {
  //   return res.status(400).json({
  //     error: 'The name or number is missing'
  //   })
  // }
  // Book.find({name: body.name}, function(err, docs) {
  //   if (docs.length) {
  //     return res.status(400).json({
  //       error: 'The name already exists in the phonebook'
  //     })
  //   }
  // })
  const person = new Book({
    name: body.name,
    number: body.number,
   })
  Book.find({ name: body.name }, function(err, result) {
    if(result.length){
      res.status(409).end()
    } else {
      person.save()
      .then(savedNote => {
        res.json(savedNote.toJSON())
      })
      .catch(error => next(error))
    }
  })
  app.use(morgan('body'))

})


app.get('/', (req, res) => {
  res.send('<h1>Welcome to Brandon\'s backend.</h1>')
})

app.get('/info', (req, res, next) => {
  const time = new Date()
  Book.find({}).then(persons => {
    return res.send(
        `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${time}</p>
        </div>`
    )
    }).catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Book.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Book.findById(req.params.id).then(book => {
      if(book){
        res.json(book.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = new Book({
    name: body.name,
    number: body.number,
  })

  Book.findByIdAndUpdate(req.params.id, { number: person.number })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id, please try again.' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)