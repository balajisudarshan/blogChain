const express = require('express')

const http = require('http')
const {Server } = require('socket.io')

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
const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin: 'http://localhost:5173',
    credentials:true
  }
})

const onlineUsers = new Map()

io.on("connection",socket=>{
  socket.on("register",userId=>{
    onlineUsers.set(userId.toString(),socket.id)
  })

  socket.on("disconnect",()=>{
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key)
        break
      }
    }

  })
})

app.set('io',io)
app.set('onlineUsers',onlineUsers)




app.use(cors({
  origin: "http://51.20.5.6",
  credentials: true,
}))

app.get('/test', (req, res) => {
  return res.json({ message: "Test" })
})
app.use(express.json())
app.use(cookieParser())
app.use('/auth', AuthRoute)
app.use('/me/profile', ProfileRoute)
app.use('/connection', ConnectionRoute)
app.use('/blog',BlogRoute)
app.use('/notification',NotificationRoute)
app.use('/tags',TagRoute)
connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
})


