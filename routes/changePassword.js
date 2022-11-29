const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../models/users.model");

router.patch("/:id",(req,res) => {
    try {
        UserModel.findById(req.params.id, async (err,user) => {
            if (!err) {
                let hashPassword = await bcrypt.hash(req.body.password,user.salt);

                let changeUsername = await UserModel.findByIdAndUpdate(req.params.id,{password: hashPassword});
                res.json({
                    success: true,
                    output: changeUsername
                });
                console.log("Password is updated");
            }
        })
    } catch (err) {
        res.json({
            success: false,
            output:err
        })
    }
});

module.exports = router;