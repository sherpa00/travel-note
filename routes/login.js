require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/users.model");

router.post("/",async (req,res,next) => {
    // after authenticating with email and password generate jwt and return in json
    console.log(req.body);
    try {

        let findByEmailUser = await UserModel.findOne({
            email: req.body.email
        });
    
        if (!findByEmailUser) {
            res.json({
                success: false,
                message: `No user with email ${req.body.email} found.`
            });
        } else {
            let isValid = await bcrypt.compare(req.body.password,findByEmailUser.password);
        
            if (!isValid) {
                res.json({
                    success: false,
                    message: "Password Incorrect"
                });
            } else {
                let signedToken = jwt.sign({sub: findByEmailUser._id},process.env.SECRET,{expiresIn: "1h"});
                res.json({
                    success: true,
                    message: "Login Successfull",
                    token: signedToken
                })
            }
        }
    
    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
});

module.exports = router;