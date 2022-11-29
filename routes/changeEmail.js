const express = require("express");
const router = express.Router();

const UserModel = require("../models/users.model");

router.patch("/:id", async (req,res) => {
    try {
        let changeEmail = await UserModel.findByIdAndUpdate(req.params.id,{email: req.body.email});
        res.json({
            success: true,
            output: changeEmail
        });
        console.log("Email is Updated");
    } catch (err) {
        res.json({
            success: false,
            output:err
        })
    }
});

module.exports = router;