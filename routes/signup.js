const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../models/users.model");

router.post("/",async (req,res) => {
    try {

        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(req.body.password,salt);

        let newUserModel = new UserModel({
            username: req.body.username,
            email: req.body.email,
            salt: salt,
            password: hashedPassword
        });

        let saveNewUser = await newUserModel.save();

        res.json({
            success: true,
            message: saveNewUser
        });

    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
})

module.exports = router;