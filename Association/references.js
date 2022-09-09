const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/assoc_ref");

const post = require("./models/post");
const user = require("./models/user");




//creating a user

// User.create({name: "Alexander", email: "alexzormelo9@gmail.com"}, (err, data)=>{
//     if(!err){
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });

//creating a post

Post.create({title: "Heyy it's me again and again", content: "wacha gonna do abat it...? nothing!"}, (err, data)=>{
    if(!err){
    //find the user by email
        User.findOne({email: "alexzormelo9@gmail.com"}, (err, user)=>{
            if(!err){
    //add the post to the user posts array
                user.posts.push(data);
    //save the user
                user.save((err, savedData)=>{
                    if(!err){
                        console.log(savedData);
                    }else{
                        console.log(err);
                    }
                });
                console.log(data);
            } else{
                console.log(err);
            }
        });
    }else{
        console.log(err);
    }
});

//find the user by email and display all posts associated to that user

// User.findOne({name: "Alexander"}).populate("posts").exec((err, data)=>{
//     if(!err){
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });