var express = require("express");
var bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
var friends = ["Alexander", "Zormelo", "koshivi", "Dodzi"];

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.post("/addfriend", function(req,res){
    var newfriend = req.body.name;
    friends.push(newfriend);
    res.redirect("/friends");
});

app.get("/friends", function(req,res){
    res.render("friends", {friends: friends});
});



app.listen("3000", function(){
    console.log("port started on port 3000");
});