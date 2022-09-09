const express = require("express");
const router = express.Router();
const sanitizer = require("express-sanitizer");
const Blog = require("../models/blogs");
const Comments = require("../models/comments");


//new route
router.get("/blogs/new", loggedIn, (req, res)=>{
    res.render("blogs/new", {user: req.user});
});

//create route
router.post("/blogs", loggedIn, (req, res)=>{
    var title = req.body.title;
    var image = req.body.image;
    var post = req.body.post;
    var user = {username: req.user.username, email: req.user.email, id: req.user._id};
    var newBlog = {title: title, image: image, post: post, user: user};
    

    req.body.post = req.sanitize(req.body.post);
    Blog.create(newBlog, (err, data)=>{
        if(!err){
            res.redirect("/");
        }else{
            res.render("blogs/new");
            console.log(err);
        }
    });
});


//show route
router.get("/blogs/:id", (req, res)=>{
    var id = req.params.id;
    Blog.findById(id).populate("comments").exec((error, blog)=>{
        if(!error){
            var numOfComments = blog.comments.length;
            res.render("blogs/show", {blog, numOfComments});
        }else{
            console.log(error);
            res.redirect("/");
        }
    });
});

//edit route
router.get("/blogs/:id/edit", userVerification, (req, res)=>{
    var id = req.params.id;
    Blog.findById(id, (error, data)=>{
        if(!error){
            res.render("blogs/edit", {blog:data});
        }else{
            console.log(error);
            res.redirect("/");
        }
    });
});

//update route
router.post("/blogsUpdate/:id", userVerification, (req, res)=>{
    var id = req.params.id;
    req.body.blog.post = req.sanitize(req.body.blog.post);
    Blog.findByIdAndUpdate(id, req.body.blog, (error, updatedData)=>{
        if(!error){
            res.redirect("/blogs/"+id);
        }else{
            res.redirect("/");
        }
    });
});

//destroy route
router.get("/blogs/:id/destroy", userVerification, (req, res)=>{
    var id = req.params.id;
    Blog.findByIdAndRemove(id, (error, deletedData)=>{
        if(!error){
            deletedData.comments.forEach((comment)=>{
                Comments.findByIdAndRemove(comment.id, (err,data)=>{
                    if(!err){
                        console.log("All associated comments delted");
                    }else{
                        console.log(err);
                    }
                });
            });
            res.redirect("/");
        }else{
            console.log(error);
        };
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
        Blog.findById(req.params.id, (err, blog)=>{
            if(blog.user.id.equals(req.user._id)){
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