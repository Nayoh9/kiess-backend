const mongoose = require("mongoose")

const Request = mongoose.model("Request", {
    email: {
        type: String,
        require: true
    },
    subscriber: {
        type: Boolean,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: false
    },
    screenshot: {
        type: Array,
        require: false
    },
    request_number: {
        type: Number,
        require: true
    }

})

module.exports = Request