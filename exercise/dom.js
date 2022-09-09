var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("visit /shop instead");
});

app.get("/shop", function(req,res){
    var products = [
        {name: "balanciaga", product: "shoe", price: "$30"},
        {name: "kente", product: "cloth", price: "$450"},
        {name: "black pot", product: "clay", price: "$12"},
        {name: "Husky", product: "pet", price: "$1502.53"}
    ];
    res.render("shop.ejs", {products: products});
});

app.get("/shop/:product", function(req,res){
    var item = req.params.product;
    res.render("product.ejs", {item: item});
    
})


app.listen("9000", function(){
    console.log("server started on port 9000");
});