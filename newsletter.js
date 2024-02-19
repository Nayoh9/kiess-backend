const nodeMailer = require('nodemailer')

const html = `hello world`

const emailSender = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "y.andre90000@gmail.com",
        pass: "wajfagkrshuabgki"
    }
})

const mailOptions = {
    from: "y.andre90000@gmail.com",
    to: ["yoyoandre90@gmail.com", "y.andre90000@gmail.com", "manelle.andre@gmail.com"],
    subject: "Hello",
    text: html

}

emailSender.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log({ error: error.message });
    } else {
        console.log("Email sent" + info.response);
    }
})