const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const auth = require("./routes/auth");
const blog = require("./routes/blogs");
const comment = require("./routes/comments");
const seed = require("./seedDB");

//seed();

mongoose.connect("mongodb://localhost/blogApp");

const User = require("./models/users");


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(sanitizer());//for ensuring form data isn't currupted by script tags by hackers

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

app.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
})


app.use(auth);
app.use(blog);
app.use(comment);


app.listen("3000", () => {
    console.log("Server started on port 3000");
});