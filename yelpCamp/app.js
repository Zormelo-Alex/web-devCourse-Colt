const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require('mongoose');
const flash =  require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Comments = require("./models/comments");
const Campground = require("./models/camps");
const User = require("./models/user");
const seedDB = require("./seed");
//seedDB();

const authRoute = require("./routes/auth");
const campsRoute = require("./routes/camps");
const commentsRoute = require("./routes/comments");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());

//connecting to the database
mongoose.connect("mongodb://localhost/yelpCamp");



//creating a new campground
// Campground.create({name: "Nungua", img: "https://images.unsplash.com/photo-1552596159-39a4fc1a4f60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbXBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", description: "This is the way the world ends"},
// function(err, campground){
//     if(!err){
//         console.log(campground);
//     }else{
//         console.log(err);
//     }
// });

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

//code to run on every route to ensure req.user is passed on each of them as user
app.use((req, res, next)=>{
    //name passed   -   object
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(authRoute);
app.use(campsRoute);
app.use(commentsRoute);


app.listen("3000", () =>{
    console.log("server started on port 3000");
});