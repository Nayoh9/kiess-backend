// Package import 
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const nodeMailer = require('nodemailer')
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Models import 
const Email = require('../models/Email')
const Request = require('../models/Request')

// Utils import 
const convertToBase64 = require("../utils/convertToBase64")

// Route to send the newsletter to all the users in stored in DB
router.post("/contact/newsletter", async (req, res) => {
    try {
        const emails = []
        const users = await Email.find()

        users.forEach((e) => {
            if (e.newsletter) {
                emails.push(e.email)
            }
        })

        const sendEmail = (user) => {

            const html = req.body.htmlText

            if (!html) {
                return res.status(400).json("Nothing to send in the newsletter")
            }

            const emailSender = nodeMailer.createTransport({
                host: process.env.EMAIL_SERVICE_HOST,
                port: 587,
                auth: {
                    user: process.env.EMAIL_SERVICE_USER,
                    pass: process.env.EMAIL_SERVICE_PASSWORD
                }
            })

            const mailOptions = {
                from: "contact@kiess.fr",
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


// Route to send a request using the contact form 
router.post('/contact/request', fileUpload(), async (req, res) => {

    try {
        const { email, subscriber, question, description, tel } = req.body

        console.log(req.body);
        console.log(req.files);

        let result
        const arrayOfFilesUrl = []

        const email_pattern = /^[^\s@]+@[a-z0-9]+(\.[a-z]{2,3}){1,2}$/
        const testEmail = email_pattern.test(email)

        if (!testEmail) {
            throw new Error("Invalid e-mail adress")
        }

        if (req.files) {

            if (!Array.isArray(req.files.screenshot)) {
                const pictureToUpload = req.files.screenshot
                result = await cloudinary.uploader.upload(convertToBase64(pictureToUpload), {
                    folder: "kiess/requests"
                })
                arrayOfFilesUrl.push(result)

            } else if (Array.isArray(req.files.screenshot)) {
                for (let i = 0; i < req.files.screenshot.length; i++) {
                    const picture = req.files.screenshot[i]

                    result = await cloudinary.uploader.upload(convertToBase64(picture), {
                        folder: "kiess/requests"
                    })
                    arrayOfFilesUrl.push(result)
                }
            }
        }


        const requestsCollectionLength = (await Request.find()).length

        const request = new Request({
            email: email,
            subscriber: subscriber,
            question: question,
            description: description,
            tel: tel,
            screenshot: arrayOfFilesUrl,
            request_number: requestsCollectionLength,
            is_resolved: false
        })

        await request.save()

        res.status(200).json("Request sent successfully")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


module.exports = router