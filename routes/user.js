// Package import 
const express = require("express")
const router = express.Router()

// Models import 
const Email = require('../models/Email')
const mongoose = require("mongoose")


// Route to save all the new users email
router.post('/user/register', async (req, res) => {
    try {
        const { email, newsletter } = req.body
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/
        const testEmail = email_pattern.test(email)
        const existInDb = await Email.findOne({ email: email })

        if (!newsletter) {
            throw new Error("No newsletter requested")
        }

        if (!testEmail) {
            return res.status(406).json("Invalid E-mail adress")
        }

        if (existInDb) {
            return res.status(409).json("This E-mail adress is already in use")
        }

        const userEmail = new Email({
            email: email
        })

        await userEmail.save()

        res.status(400).json("E-mail adress saved")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router
