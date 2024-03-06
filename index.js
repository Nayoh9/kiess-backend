// Package import
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.text({ type: 'text/html' }));


// Routes import
const userRoute = require('./routes/user')
const newsletterRoute = require('./routes/newsletter')

app.use(userRoute)
app.use(newsletterRoute)

app.all('*', (req, res) => {
    res.status(400).json('This route does not exist')
})

if (process.env.PORT) {
    app.listen(process.env.PORT, () => {
        console.log("Server started");
    });
} else {
    app.listen(3000, () => {
        console.log("Server started 3000");
    });
}