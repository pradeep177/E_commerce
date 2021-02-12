const User = require("../models/user");
const { validationResult } = require('express-validator');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty() ){
       return res.json({
           error: errors.array()[0].msg
       });
    //    "errors": [{
    //     "location": "body",
    //     "msg": "Invalid value",
    //     "param": "username"
    //   }]
   }
   const user = new User(req.body)
   user.save()
   .then(user => res.send(user))
   .catch(err => res.send(`Failed to post the data ${err}`));
}

exports.signin = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.json({
            error: errors.array()[0].msg
        });
    }
    const {email, password } = req.body;
   User.findOne({email}, (err, user) =>{
        if(err || !user){
            res.status(400).json({ 
                error: "user do not exist please signup to continue"
            })
        }
        //if email is found check for password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            })
        }
        //if the match is found signin 
        //create a token
        var token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put that into users cookie
        res.cookie("token", token, {expire: new Date() + 9999})

        //send response to the frontend
        const {_id, name, email, privilege} = user;
        res.json({token, user:{_id, name, email, privilege}})
   })
 }

  //protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
    //auth holds the same _id generated during signin
}); 

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.privilege === 0) {
        return res.status(403).json({
            error: " YOU ARE NOT ADMIN, ACCESS DENIED"
        })
    }
    next();
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message:"User signed out"
    });
}

