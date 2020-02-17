const express = require('express')
require('dotenv').config()
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

let mongoUrl = process.env.MONGODB_URI
if(process.env.NODE_ENV === 'test'){
    mongoUrl = process.env.MONGODB_URI_TESTING
}
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to Mongo")
    })
    .catch((error) => {
        console.log("Error connecting to Mongo: ",error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app