import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const USER_COMMON_PASSWORD = process.env.USER_COMMON_PASSWORD

const PORT = process.env.PORT || 4000

let MONGODB_URI = process.env.MONGODB_URI

export default {
  JWT_SECRET,
  USER_COMMON_PASSWORD,
  MONGODB_URI,
  PORT
}