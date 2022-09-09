const express = require("express");
const router = express.Router();
const Campground = require("../models/camps");
const Comments = require("../models/comments");
const middleware = require("../middleware/middleware");

router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res)=>{
    //var user = req.user;
    var id = req.params.id;
    Campground.findById(id, (err, campground)=>{
        if(!err){
            res.render("comments/new", {campground});
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("/campGrounds");
        }
    });
});

router.post("/campgrounds/:id/comments", isLoggedIn, (req, res)=>{
    var id = req.params.id;
    Campground.findById(id, (err, foundCamp)=>{
        if(!err){
            Comments.create({content: req.body.content, author: req.user}, (err, comment)=>{
                if(!err){
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    //console.log(comment);
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    req.flash("success", "Comment added!");
                    res.redirect("/campgrounds/"+id);
                }else{
                    req.flash("error", "Sorry, Unexpected error!");
                    res.redirect("/campGrounds/"+id);
                }
            }); 
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("/campGrounds/"+id);
        }
    });
    
});

router.get("/campgrounds/:id/comments/:cid/edit", middleware.commentsOwnership, (req, res)=>{
    var cid = req.params.cid;
    var id = req.params.id;
    Campground.findById(id, (err, foundCamp)=>{
        if(!err){
            Comments.findById(cid, (err,comment)=>{
                if(!err){
                   res.render("comments/edit", {comment, campground:foundCamp}); 
                }else{
                    req.flash("error", "Sorry, Unexpected error!");
                    res.redirect("back");
                }
            });
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("back");
        }
    });
});

router.post("/campgrounds/:id/comments/:cid/edit", middleware.commentsOwnership, (req, res)=>{
    Comments.findByIdAndUpdate(req.params.cid, {content: req.body.content}, (err, comment)=>{
        if(!err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("back");
        }
    });
});

router.get("/campgrounds/:id/comments/:cid/delete", middleware.commentsOwnership, (req, res)=>{
    var cid = req.params.cid;
    var id = req.params.id;
    Campground.findById(id, (err, data)=>{
        if(!err){
            Comments.findByIdAndRemove(cid, (err, data)=>{
                if(!err){
                    //console.log(data);
                    req.flash("success", "You deleted a comment");
                    res.redirect("/campgrounds/"+id);
                }else{
                    req.flash("error", "Sorry, Unexpected error!");
                    res.redirect("/campGrounds/"+id);
                }
            });
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("/campGrounds/"+id);
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Sorry, You must Login first");
    res.redirect("/login");
}

// function authorization(req, res, next){
//     var cid = req.params.cid;
//     //if user is authenticated
//     if(req.isAuthenticated()){
//         Comments.findById(cid, (err, comment)=>{
//             if(!err){
//                 //does user own campground
//                 if(comment.author.id.equals(req.user._id)){
//                     next();
//                 }else{
//                     res.redirect("back");
//                 }
//             }else{
//                 res.redirect("back");
//             }
//         });
//     }
// };


module.exports = router;