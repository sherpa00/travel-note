const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const passport = require("../configs/passport.config");
const NoteModel = require("../models/notes.model");

router.post("/",upload.single("file"),async (req,res) => {
    // if file is selected or not 
    if (!req.file) {
        res.json({
            success: false,
            message: "File is not selected"
        });
    } else {
        try {
            let newNoteModel = new NoteModel({
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
                title: req.body.title,
                location: req.body.location,
                date: req.body.date,
                star: req.body.star,
                note: req.body.note,
                userId: req.user._id
            });
    
            let saveNote = await newNoteModel.save();
            res.json({
                success: true,
                output: saveNote
            })
        } catch (err) {
            res.json({
                success: false,
                output: err
            })
        }
    }
});

module.exports = router;