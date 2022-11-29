const express = require("express");
const router = express.Router();

const UserModel = require("../models/users.model");

router.patch("/:id", async (req,res) => {
    try {
        let changeUsername = await UserModel.findByIdAndUpdate(req.params.id,{username: req.body.username});
        res.json({
            success: true,
            output: changeUsername
        });
        console.log("Username is updated");
        console.log(req.body);
    } catch (err) {
        res.json({
            success: false,
            output:err
        })
    }
});

module.exports = router;