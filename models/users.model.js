const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    issued: {
        type: String,
        default: new Date().toDateString()
    }
});

module.exports = mongoose.model("users",UserSchema);