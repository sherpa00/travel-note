require("dotenv").config();
const JWTpassport = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const UserModel = require("../models/users.model");

passport.use(
    new JWTpassport({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    },
    (jwt_payload,done) => {
        // find user with db._id as jwt_payload.sub
        
        UserModel.findById(jwt_payload.sub,(err,user) => {
            if (err) {
                return done(null,false,{message: "Some error occured"})
            }

            if (user) {
                return done(null,user,{message: "Login successfull"});
            } else {
                return done(nul,false,{message: "User not found in db"})
            }
        })
    })
)

module.exports = passport;