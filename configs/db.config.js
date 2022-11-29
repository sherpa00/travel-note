const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/travel-note",(err) => {
    if (!err) {
        console.log("Connected to the database...");
    }
})