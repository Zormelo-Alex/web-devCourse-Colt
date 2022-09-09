const mongoose = require("mongoose");
const Blogs = require("./models/blogs");
const Comments = require("./models/comments");
const Users = require("./models/users");


function deleteAllBlogs(){
    Blogs.remove({}, (err, data)=>{
        if(!err){
            Comments.remove({}, (err, data)=>{
                if(!err){
                    console.log(data);
                }else{
                    console.log(err);
                }
            })
            console.log(data);
        }else{
            console.log(err);
        }
    });
}

module.exports = deleteAllBlogs;