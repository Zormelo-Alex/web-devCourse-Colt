const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
const Blog = require("../models/blogs");

//index routes
router.get("/", (req, res)=>{
    res.redirect("/blogs");
});

router.get("/blogs", (req, res)=>{
    Blog.find({}, (err, data)=>{
        if(!err){
           res.render("index", {blogs: data}); 
        }else{
            console.log(err);
        }
    });
 
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), (req, res)=>{
});

router.get("/signup", (req, res)=>{
    res.render("signup");
});

router.post("/signup", (req, res)=>{
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, (err, newUser)=>{
        if(!err){
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/");
            });
        }else{
            console.log(err);
        }
    });
});

router.get("/logout", (req, res)=>{
    req.logOut((err)=>{
        if(!err){
            res.redirect("/");
        }
    });
});


module.exports = router;