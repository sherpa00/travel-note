const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');

//____________________________________________ CONFIG FILES ______________________________________________
require("dotenv").config();
const passport = require("./configs/passport.config");
const connection = require("./configs/db.config");

// ____________________________________________ STATIC FILES ______________________________________________
app.use("/",(express.static(path.join(__dirname,"client/home"))));
app.use("/signup",(express.static(path.join(__dirname,"client/signup"))));
app.use("/login",(express.static(path.join(__dirname,"client/login"))));
app.use("/home",(express.static(path.join(__dirname,"client/user_home"))));
app.use("/home/add",(express.static(path.join(__dirname,"client/addNote"))));
app.use("/home/update",(express.static(path.join(__dirname,"client/updateNote"))));
app.use("/home/settings",(express.static(path.join(__dirname,"client/userSettings"))));
app.use("/account/password/reset",(express.static(path.join(__dirname,"client/forgetPassword"))));


// _____________________________________________ MIDDLEWARES _______________________________________________
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// ________________________________________________ ROUTES ___________________________________________________
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const addNoteRouter = require("./routes/addNote");
const showNoteRouter = require("./routes/showNote");
const updateNoteRouter = require("./routes/updateNote");
const deleteNoteRouter = require("./routes/removeNote");
const changeUsernameRouter = require("./routes/changeUsername");
const changeEmailRouter = require("./routes/changeEmail");
const changePasswordRouter = require("./routes/changePassword");
const deleteUserRouter = require("./routes/deleteUser");
const verfiyEmailRouter = require("./routes/email");
const resetPasswordRouter = require("./routes/resetPassword");
const { kMaxLength } = require("buffer");

app.get("/",(req,res) => {
    res.json({
        success: true
    })
});

app.get('/user',passport.authenticate('jwt',{session: false}),(req,res,next) => {
    res.json({
        user: req.user,
        success: true
    })
})

app.use("/signup",signupRouter);
app.use("/login",loginRouter);

app.use("/note/add",passport.authenticate('jwt',{session: false}),addNoteRouter);
app.use("/note/show",passport.authenticate("jwt",{session: false}),showNoteRouter);
app.use("/note/update",passport.authenticate("jwt",{session: false}),updateNoteRouter);
app.use("/note/delete",passport.authenticate("jwt",{session: false}),deleteNoteRouter);
app.use("/user/settings/username",passport.authenticate("jwt",{session: false}),changeUsernameRouter);
app.use("/user/settings/email",passport.authenticate("jwt",{session: false}),changeEmailRouter);
app.use("/user/settings/password",passport.authenticate("jwt",{session: false}),changePasswordRouter);
app.use("/user/settings/deleteUser",passport.authenticate("jwt",{session: false}),deleteUserRouter);
app.use("/account/email/verify",verfiyEmailRouter);
app.use("/account/password/reset",resetPasswordRouter);

//________________________________________________ SERVER START ________________________________________________

app.listen(3000,() => {
    console.log("Server is listenig at 3000...");
})