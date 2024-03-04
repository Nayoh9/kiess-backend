const mongoose = require('mongoose');

const Email = mongoose.model("Email", {
    email: {
        type: String,
        required: true
    },
    newsletter: {
        type: Boolean,
        required: true
    }
})

module.exports = Email