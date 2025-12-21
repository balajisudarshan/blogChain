const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./db/db')
const AuthRoute = require('./routes/AuthRoute')
const cookieParser = require('cookie-parser')
const ProfileRoute = require('./routes/ProfileRoute')
const ConnectionRoute = require('./routes/ConnectionRoute')
const BlogRoute = require('./routes/BlogRoute')

require('dotenv').config()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.get('/test', (req, res) => {
  return res.json({ message: "Test" })
})
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', AuthRoute)
app.use('/me/profile', ProfileRoute)
app.use('/connection', ConnectionRoute)
app.use('/blog',BlogRoute)
connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
})


