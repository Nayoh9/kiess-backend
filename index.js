// Package import
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(bodyParser.text({ type: 'text/html' }));
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/kiess')

// Routes import
const userRoute = require('./routes/user')
const newsletterRoute = require('./routes/newsletter')

app.use(userRoute)
app.use(newsletterRoute)

app.all('*', (req, res) => {
    res.status(400).json('This route does not exist')
})

app.listen(3000)