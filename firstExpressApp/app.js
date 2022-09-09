var express = require('express');
//initializing express
var app = express();
//routing
// / => hello Dom
app.get("/", function(req, res){
    res.send("hello DOM");
});
// /bye => goodbye Dom
app.get("/bye/:name", function(req, res){
    var name = req.params.name;
    var names = name.toUpperCase();
    res.send("goodbye "+ names);
});
// /dog => black loco
app.get("/dog",function(req, res){
    res.send("Black Local Breed DDOG!!!!")
});
app.get("/d/:postname/", function(req, res){
    res.send("welcome to a post");
});
app.get("*", function(req ,res){
    res.send("404 page not found!");
});
//listener
app.listen(3000, function(){
    console.log("port started");
})