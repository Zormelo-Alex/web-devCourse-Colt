//embeded

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/assoc");

const postSchema = new mongoose.Schema({title: String, content: String});
const Post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({name: String, email:String, posts: [postSchema]});
const User = mongoose.model("User", userSchema);




// find user by name
User.findOne({name: "Alexander"}, (err, user)=>{
    if(!err){
        // //push a new post to the user posts array
        // user.posts.push({title: "Something small is happening", content: "just kidding, again!, not a song this time tho"});
        // //save the user
        // user.save((err, data)=>{
        //     if(!err){
        //         console.log(data);
        //     }else{
        //         console.log(err);
        //     }
        // });
        console.log(user)
    }else{
        console.log(err);
    }
});


// User.create({title: "Alexander", content: "alexzormelo9@gmail.com"}, (err, data)=>{
//     if(!err){
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });

// Post.create({title: "Made a breakthrough!", content: "Started studying js for web development as so far so good!"}, (err, data)=>{
//     if(!err){
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });