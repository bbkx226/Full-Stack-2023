require('dotenv').config()
const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
const url = config.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

module.exports = mongoose.model('Blog', blogSchema)