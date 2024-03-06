// Package import 
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const nodeMailer = require('nodemailer')


// Models import 
const Email = require('../models/Email')

// Route to send the newsletter to all the users in stored in DB
router.post("/newsletter", async (req, res) => {
    try {
        const hello = []
        const emails = []
        const users = await Email.find()

        users.forEach((e) => {
            if (e.newsletter) {
                emails.push(e.email)
            }
        })

        const sendEmail = (user) => {

            const html = req.body.htmlText
            const emailSender = nodeMailer.createTransport({
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: "y.andre90000@gmail.com",
                    pass: process.env.EMAIL_SERVICE_PASSWORD
                }
            })

            const mailOptions = {
                from: "y.andre90000@gmail.com",
                to: user,
                subject: "Kiess Newsletter",
                html: html
            }

            emailSender.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ error: error.message });
                } else {
                    console.log("Email sent" + info.response);
                    res.status(200).json("Newsletter sent")
                }
            })
        }

        emails.forEach((e) => {
            sendEmail(e)
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router