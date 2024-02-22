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

        const emails = []
        const users = await Email.find()

        users.forEach((e) => {
            emails.push(e.email)
        })

        const html = req.body.htmlText
        const emailSender = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "y.andre90000@gmail.com",
                pass: process.env.GMAIL_SERVICE_PASSWORD
            }
        })

        const mailOptions = {
            from: "y.andre90000@gmail.com",
            to: emails,
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


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router