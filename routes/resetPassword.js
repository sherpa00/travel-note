const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const ResetTokenModel  = require("../models/resetToken.model");
const UserModel = require("../models/users.model");

router.post("/", async (req,res) => {
    try {
        // here verify the reset token and its expiration date and change password
        let findResetToken = await ResetTokenModel.findOne({
            token: req.body.token
        });

        if (findResetToken) {
             // if reset token found then change password of user by using userId
             try {
                let userByToken = await UserModel.findById(findResetToken.userId);
                
                let hashPassword = await bcrypt.hash(req.body.password,userByToken.salt);

                let passwordUpdateByToken = await UserModel.findByIdAndUpdate(findResetToken.userId,{password: hashPassword});

                if (passwordUpdateByToken) {
                    await ResetTokenModel.deleteOne({token: req.body.token});
                }

                res.json({
                    success: true,
                    output: passwordUpdateByToken,
                    message: "Reset Password Successful"
                })

             } catch (err) {
                res.json({
                    success: false,
                    message: "Error occured while reseting."
                })
             }
        } else {
            res.json({
                success: false,
                output: findResetToken,
                message: "Reset Token is unauthorized or expired! Try Again."
            })
        }

    } catch (err) {
        res.json({
            success: false,
            output: err,
            message: "Some Error occured wile reseting.Try Again."
        })
    }
});

module.exports = router;