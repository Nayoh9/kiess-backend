// Package import

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/kiess')

// Routes import
const userRoute = require('./routes/user')

app.use(userRoute)

app.all('*', (req, res) => {
    res.status(400).json('This route does not exist')
})

app.listen(3000)