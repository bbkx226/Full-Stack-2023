const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const server = http.createServer(app)

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app