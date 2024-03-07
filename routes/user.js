// Package import 
const express = require("express")
const router = express.Router()

// Models import 
const Email = require('../models/Email')
const mongoose = require("mongoose")


// Route to save all the new users email
router.post('/user/register', async (req, res) => {
    try {


        const { email, newsletter, conditions } = req.body
        const email_pattern = /^[^\s@]+@[a-z0-9]+(\.[a-z]{2,3}){1,2}$/
        const testEmail = email_pattern.test(email)
        const existInDb = await Email.findOne({ email: email })

        if (!conditions) {
            throw new Error("Conditions must be accepted")
        }

        if (!testEmail) {
            return res.status(406).json("Invalid E-mail adress")
        }

        if (existInDb) {
            return res.status(409).json("This E-mail adress is already in use")
        }

        const userEmail = new Email({
            email: email,
            newsletter: newsletter
        })

        await userEmail.save()

        res.status(200).json("E-mail adress saved")

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Route for the contact form 

router.post('/contact', async (req, res) => {

    console.log(req.body);

    try {

    } catch (error) {

    }


})


module.exports = router
