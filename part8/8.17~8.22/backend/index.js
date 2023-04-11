import { ApolloServer } from 'apollo-server'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { typeDefs, resolvers } from './graphqls.js'
import config from './config.js'
import logger from './logger.js'
import User from './models/user.js'

logger.info('connecting to MongoDB...')
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info("connected to MongoDB")
}).catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        config.JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen(config.PORT).then(({ url }) => {
  logger.info(`Server ready at ${url}`)
})