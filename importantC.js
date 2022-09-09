function isEven(num){
    if(num % 2 == 0){
        return true;
    }
    return false;
}

//factorial
function factorial(num){
    var ans = 1;
    if(num == 0){
        return 1;
    }else{
    for(var i = 2; i<=num; i++){
        ans *= i;
    }
    return ans;
    }
}


//replace string character
function dashtoSnake(thing){
   var newthing = thing.replace(/-/, "_");
   return newthing;
}


//array stuff
var colors = ["red", "blue", "green", "orange"];
var same = [2,2,2,2,2,2,2,2,2,2];
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

function printReverse(arr){
    console.log("print reverse");
for(var i = arr.length-1; i >= 0; i--){
        console.log(arr[i]);
}
}

function isUnform(arr){
    console.log("is Uniform");
    for(var i = 0; i < arr.length; i++){
        if(arr[i] != arr[0]){
            return false;
     }
    }return true;
}

function sumArray(arr){
    console.log("sum");
    var sum = 0;
    for(var i = 0; i<arr.length; i++){
        sum += arr[i];
    }
    return sum;
}

function max(arr){
    console.log("max");
    var max = arr[0];
    for(var i = 0; i<arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
        }
    }
    return max;
}


// =========
// VERSION 1
// =========
function myForEach(arr, func){
	for (var i = 0; i < arr.length; i++) {
		func(arr[i]);
	}
}

var colors = ["red", "orange", "yellow", "green", "blue", "PURPLE"];
myForEach(colors, function(color){
	console.log(color);
});

// =========
// VERSION 2 making your own foreach function
// =========
Array.prototype.myForEach = function(func){
  for(var i = 0; i < this.length; i++) {
   func(this[i]);
  }
};

var colors = ["red", "orange", "yellow", "green", "blue", "PURPLE"];
colors.myForEach(function(color){
	console.log(color);
});



//game counter
//selector
var p1 = document.querySelector(".p1");
var p2 = document.querySelector(".p2");
var num = document.querySelector(".num");
var numbers = document.querySelector(".number");
var play1 = document.querySelector(".play1");
var play2 = document.querySelector(".play2");
var resets = document.querySelector(".reset");
var index = 0;
var index2 = 0;
var gameOver = false;
var limit = num.textContent;

//event listeners
play1.addEventListener("click",addtop1);
play2.addEventListener("click",addtop2);
resets.addEventListener("click",reset);
numbers.addEventListener("change", changed);


//functions
function addtop1(){
    if(!gameOver){
        index++;
        if(index == limit){
            p1.style.color = "green";
            gameOver = true;
        }
        p1.textContent = index;
    }
}
function addtop2(){
    if(!gameOver){
        index2++;
        if(index2 == limit){
            p2.style.color = "green";
            gameOver = true;
        }
        p2.textContent = index2;
    }
}
function reset(){
    p1.textContent = 0;
    index = 0;
    p2.textContent = 0;
    index2 = 0;
    p2.style.color = "black";
    p1.style.color = "black";
    gameOver = false;
}

function changed(){
    num.textContent = numbers.value;
    limit = numbers.value;
}

//looping lis
var li = document.getElementsByTagName("li");


for(var i = 0; i < li.length; i++){
    li[i].addEventListener("mouseover", changecolor);
    li[i].addEventListener("mouseout", changecoloragain);
    li[i].addEventListener("click", greyout);
}


function changecolor(){
    this.style.color = "red";
}
function changecoloragain(){
    this.style.color = "black";
}
function greyout(){
    this.classList.toggle("grey");
}

//yelp camp things
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Comments = require("./models/comments");
const Campground = require("./models/camps");
const User = require("./models/user");
const seedDB = require("./seed");
//seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

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

//code to run on every route to ensure req.user is passed on each of them
app.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
});

app.get("/", (req, res)=>{
    res.redirect("/YelpCamp");
});

app.get("/YelpCamp", (req, res)=>{
    //var user = req.user;
    res.render("home")
});

app.get("/campGrounds", (req,res)=>{
    //var user = req.user;
    Campground.find({},(err, camps)=>{
        if(!err){
            //console.log(req.user);
            res.render("campgrounds/index", {sites: camps});
        }else{
            console.log(err);
        }
    });
});

app.post("/campGrounds", isLoggedIn, (req, res)=>{
    //get data in form
    var siteName = req.body.name;
    var url = req.body.image;
    var description = req.body.disc;
    //making the object
    var newCampSite = {name: siteName, img: url, description: description};
    //add to databaseq
    Campground.create(newCampSite, (err, camps)=>{
        if(!err){
            //console.log(camps);
            //redirct back to campGrounds
            res.redirect("/campGrounds");
        }else{
            console.log(err);
        }
    });
    
});

app.get("/campGrounds/new", isLoggedIn, (req,res)=>{
    //var user = req.user;
    res.render("campgrounds/new");
});

app.get("/campGrounds/:id", (req, res)=>{
    //var user = req.user;
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec((err, foundCampground)=>{
        if(!err){
            res.render("campgrounds/show", {campground: foundCampground});
        }else{
            console.log("Oops! "+ err);
        }
    });
    
});

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res)=>{
    //var user = req.user;
    var id = req.params.id;
    Campground.findById(id, (err, campground)=>{
        if(!err){
            res.render("comments/new", {campground});
        }else{
            console.log("Oops! "+ err);
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res)=>{
    var id = req.params.id;
    Campground.findById(id, (err, foundCamp)=>{
        if(!err){
            Comments.create(req.body.comment, (err, data)=>{
                if(!err){
                    foundCamp.comments.push(data);
                    foundCamp.save();
                    res.redirect("/campgrounds/"+id);
                }else{
                    console.log(err);
                }
            });
        }else{
            res.redirect("/");
            console.log(err);
        }
    });
    
});

app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", (req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(!err){
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/");
                console.log(user);
            });
        }else{
            //var user = req.user;
            return res.render("register");
            console.log(err);
        }
    });
});

app.get("/login", (req, res)=>{
    //var user = req.user;
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{
    res.render("login");
});

app.get("/logout", (req, res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err)
        }else{
         res.redirect("/");   
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen("3000", () =>{
    console.log("server started on port 3000");
});