const mongoose = require("mongoose");
const Campground = require("./models/camps");
const Comments = require("./models/comments");


function seedDB(){
    Campground.remove({}, (err, deletedData)=>{
        if(err){
            console.log("err");            
    }
Campground.create({
    name: "Hohoe mountains",
    img: "https://images.unsplash.com/photo-1658128234026-77c9d8047e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "Had so much fun here last year, great view, awesome photos, you'd love it!"
}, (err, camp)=>{
    if(!err){
        console.log(camp);
    }
});
Campground.create({
    name: "Nungua Beach",
    img: "https://images.unsplash.com/photo-1657664042482-a6e53c1b03a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", description: "This is the way the world ends"
},(err, camp)=>{
if(!err){
    console.log(camp);
}
});
Campground.create({
    name: "Water log CaveYard",
    img: "https://images.unsplash.com/photo-1658023495319-2786b348d829?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60", description: "blah blah blah..."
},(err, camp)=>{
if(!err){
    console.log(camp);
}
});

Campground.findOne({name: "Nungua Beach"}, (err, foundCamp)=>{
if(!err){
Comments.create({
content: "This is the best place to go, I love it!",
}, (err, comment)=>{
if(!err){
    foundCamp.comments.push(comment);
    foundCamp.save();
    console.log(comment);
}
});
}
});
});
    



}

module.exports = seedDB;