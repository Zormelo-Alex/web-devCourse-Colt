var express = require('express');
var app = express();
//routes
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
});
app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal;
    var sounds = {
        dog: "woof",
        cow: "moo",
        pig: "oink",
        cat: "..."
    };
    var sound = sounds[animal];
    res.send("The "+ animal +" says " +sound);
});
app.get("/repeat/hello/:number", function(req, res){
    var number = Number(req.params.number);
    var results = "";
    for(var i = 0; i < number; i++){
        results += "Hello ";
    }
    res.send(results);
});
app.get("/repeat/blah/:number", function(req, res){
    var number = Number(req.params.number);
    var results = "";
    for(var i = 0; i < number; i++){
        results += "blah ";
    }
    res.send(results);
});
app.get("*", function(req, res){
    res.send("sorry, page not found....what are you doing with your life");
});
//listener
app.listen(4000,function(){
    console.log("Server started on port 4000");
});