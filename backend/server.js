const express = require('express')
const cors = require('cors')
const connectDb = require('./db/db')
const AuthRoute = require('./routes/AuthRoute')
const cookieParser = require('cookie-parser')
const ProfileRoute = require('./routes/ProfileRoute')
const ConnectionRoute = require('./routes/ConnectionRoute')
const BlogRoute = require('./routes/BlogRoute')
const NotificationRoute = require('./routes/NotificationRoute')
const TagRoute = require('./routes/TagRoute')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/test', (req, res) => {
  return res.json({ message: "Test" })
})

app.use('/auth', AuthRoute)
app.use('/me/profile', ProfileRoute)
app.use('/connection', ConnectionRoute)
app.use('/blog', BlogRoute)
app.use('/notification', NotificationRoute)
app.use('/tags', TagRoute)

connectDb()
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Error:", err))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})