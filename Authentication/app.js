const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/auth");
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "DOM",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res)=>{
    res.redirect("/Auth");
});

app.get("/Auth", (req, res)=>{
    res.render("home");
});

app.get('/secret', isLogedin, (req , res)=>{
    res.render('secret');
 });

app.get("/auth/register", (req, res)=>{
    User.find({}, (err, data)=>{
        if(!err){
          res.render("register", {data});  
        }else{
            console.log(err);
        }
    });
});


app.post("/auth/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(!err){
            passport.authenticate('local')(req, res, ()=>{
                console.log(user);
                res.redirect('/');
            });
        }else{
            console.log(err);
            return res.redirect("/")
        }
    });
});

app.get("/auth/login", (req, res)=>{
    res.render("login");
});

app.post("/auth/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/auth/login"
}), (req, res)=>{
    res.render("login")
});

app.get("/logout", (req, res)=>{
    req.logOut();
    res.redirect("/");
});

function isLogedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}





app.listen("5000", ()=>{
    console.log("server started on port 5000");
});