const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const Comments = require("../models/comments");

router.post("/blogs/:id/comments", loggedIn, (req, res)=>{
    var id = req.params.id;
    var comment = {
        content: req.body.content,
        user: {
            username: req.user.username,
            id: req.user._id
        }
    }
    Blog.findById(id, (err, blog)=>{
        if(!err){
            Comments.create(comment, (err, newcomment)=>{
                if(!err){
                    blog.comments.push(newcomment);
                    blog.save();
                    res.redirect("/blogs/"+id);
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});

router.get("/blogs/:id/comment/:cid/edit", userVerification, (req, res)=>{
    var id = req.params.id;
    var cid = req.params.cid;
    Blog.findById(id, (err, blog)=>{
        if(!err){
            Comments.findById(cid, (err, comment)=>{
                if(!err){
                   res.render("comments/show", {blog, comment}); 
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
});

router.post("/blogs/:id/comment/:cid/edit", userVerification, (req, res)=>{
    Comments.findByIdAndUpdate(req.params.cid, {content: req.body.content}, (err, comment)=>{
        if(!err){
            res.redirect("/blogs/"+req.params.id);
        }else{
            console.log(err);
        }
    });
});

router.get("/blogs/:id/comment/:cid/delete", userVerification, (req, res)=>{
    Comments.findByIdAndRemove(req.params.cid, (err, comment)=>{
        if(!err){
            res.redirect("back");
        }else{
            console.log(err);
        }
    });
});

function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

function userVerification(req, res, next){
    if(req.isAuthenticated()){
        Comments.findById(req.params.cid, (err, comment)=>{
            if(comment.user.id.equals(req.user._id)){
                next();
            }else{
                res.send("sorry you do not own this post!");
            }
        });
    }else{
        res.redirect("/login");
    }
}

module.exports = router;
