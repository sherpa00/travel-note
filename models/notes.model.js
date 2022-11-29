const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    image : {
        data: Buffer,
        contentType: String
    },
    title : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    star : {
        type: String,
        required: true
    },
    note : {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("notes",NotesSchema);