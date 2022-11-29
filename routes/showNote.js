const express = require("express");
const router = express.Router();

const NoteModel = require("../models/notes.model");

router.get("/",async(req,res) => {
    try {
        let findNotesByUserId = await NoteModel.find({userId: req.user._id});
        res.json({
            success: true,
            output: findNotesByUserId,
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

router.get("/:id",async(req,res) => {
    try {
        let findNoteByIdAndUserId = await NoteModel.findOne({
            userId: req.user._id,
            _id: req.params.id
        });
        res.json({
            success: true,
            output: findNoteByIdAndUserId
        });
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

module.exports = router