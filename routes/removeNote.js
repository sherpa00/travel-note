const express = require("express");
const router = express.Router();

const NoteModel = require("../models/notes.model");


router.delete("/deleteall",async (req,res) => {
    try {
        let deleteAllNotes = await NoteModel.deleteMany({
            userId: req.user._id
        });
        res.json({
            success: true,
            output: deleteAllNotes
        });
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
})

router.delete("/:id",async (req,res) => {
    try {
        let deleteNote = await NoteModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        res.json({
            success: true,
            output: deleteNote
        })
    } catch (err) {
        res.json({
            success: false,
            output: err
        })
    }
});

module.exports = router;