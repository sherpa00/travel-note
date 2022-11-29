const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const update = multer({storage: storage})

const NoteModel = require("../models/notes.model");

router.patch("/:id",update.single("file"),async (req,res) => {

    if (!req.file) {
        try {
            let updateNote = await NoteModel.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.user._id
                },
                {
                    title: req.body.title,
                    location: req.body.location,
                    date: req.body.date,
                    star: req.body.star,
                    note: req.body.note,
                }
            );
            res.json({
                success: true,
                output: updateNote
            });
        } catch(err) {
            res.json({
                success: false,
                output: err
            })
        }
    } else {
        try {
            let updateNote = await NoteModel.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.user._id
                },
                {
                    image: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                    },
                    title: req.body.title,
                    location: req.body.location,
                    date: req.body.date,
                    star: req.body.star,
                    note: req.body.note,
                }
            );
            res.json({
                success: true,
                output: updateNote
            });
        } catch(err) {
            res.json({
                success: false,
                output: err
            })
        }
    }
    /*
    try {
        let updateNote = await NoteModel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            {
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
                title: req.body.title,
                location: req.body.location,
                date: req.body.date,
                star: req.body.star,
                note: req.body.note,
            }
        );
        res.json({
            success: true,
            output: updateNote
        });
    } catch(err) {
        res.json({
            success: false,
            output: err
        })
    }*/
});

module.exports = router;