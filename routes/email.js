const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require('nodemailer');

const UserModel = require("../models/users.model");
const ResetTokenModel = require("../models/resetToken.model");

router.post("/", async (req,res) => {
    try {
        let verfiyEmail = await UserModel.findOne({email: req.body.email});
        if (verfiyEmail === null) {
            res.json({
                success: false,
                output: verfiyEmail,
                message: "Email is not Registered."
            })
        } else {

            // first create a token reset
            let token = crypto.randomBytes(32).toString('hex').slice(0,6);

            // save the token in db
            try {
                let newResetTokenModel = new ResetTokenModel({
                    userId: verfiyEmail._id,
                    token: token
                });
    
                let saveResetToken = await newResetTokenModel.save();
    
                // send email with reset token and save it
                let emailTransporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "bugbounty898@gmail.com",
                        pass: "jpcadwnyaahibmpp"
                    }
                });

                let emailSendObj = {
                    from: "bugbounty898@gmail.com",
                    to: req.body.email,
                    subject: "PASSWORD RESET TOKEN",
                    text: `Your request to get the password token was allowed.
                        Here is the token: ${token}
                    `
                };

                // here send email
                emailTransporter.sendMail(emailSendObj);

                res.json({
                    success: true,
                    message: "Reset Token is sent successfully"
                })
            } catch (err1) {
                res.json({
                    success: false,
                    output: err1,
                    message: "Error occured"
                })
            }
            
        }
    } catch (err) {
        res.json({
            success: false,
            output: err,
            message: "Some error occured while verifying user email."
        })
    }
});



module.exports = router;