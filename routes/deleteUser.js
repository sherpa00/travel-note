const express = require("express");
const router = express.Router();

const UserModel = require("../models/users.model");
const NoteModel = require("../models/notes.model");

router.delete("/:id",(req,res) => {
    try {
        // first remove all the notes of the user and then remove the user
        NoteModel.deleteMany({userId: req.params.id},async (err,done) => {
            if (!err) {
                let deleteUser = await UserModel.deleteMany({});
                res.json({
                    success: true,
                    output: deleteUser
                });
                console.log("User is Removed");
            }
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

module.exports = router;