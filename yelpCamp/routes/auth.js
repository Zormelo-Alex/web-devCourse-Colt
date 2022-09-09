const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");




router.get("/", (req, res)=>{
    res.redirect("/YelpCamp");
});

router.get("/YelpCamp", (req, res)=>{
    //var user = req.user;
    res.render("home")
});



router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(!err){
            passport.authenticate("local")(req, res, ()=>{
                req.flash("success", "Welcome to YelpCamp "+user.username);
                res.redirect("/campGrounds");
                //console.log(user);
            });
        }else{
            //var user = req.user;
            req.flash("error", err.message);
            return res.render("register");
        }
    });
});

router.get("/login", (req, res)=>{
    //var user = req.user;
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureMessage: true
}), (req, res)=>{
    res.render("login");
});

router.get("/logout", (req, res)=>{
    req.logOut((err)=>{
        if(!err){
        req.flash("success", "Logged out succesfully");
        res.redirect("/campGrounds");
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Sorry, You're not logged in");
    res.redirect("/login");
}

module.exports = router;
