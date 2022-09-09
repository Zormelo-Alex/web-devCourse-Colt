var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home")
});

app.get("/dom/:wife", function(req, res){
    var wife = req.params.wife;
    res.render("life", {wifep: wife});
});


app.listen(3000,function(){
    console.log("port started on port 3000");
});