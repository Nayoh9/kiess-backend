const mongoose = require('mongoose');

const Email = mongoose.model("Email", {
    email: {
        type: String,
        required: true
    }
})

module.exports = Email