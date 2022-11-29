const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: "10min"
    }
});

module.exports = mongoose.model("resetToken",ResetTokenSchema);