const middlewareObject = {};
const Campground = require("../models/camps");
const Comments = require("../models/comments");


// middlewareObject.campgroundOwnership = function(req, res, next){
//         var id = req.params.id;
//         //if user is authenticated
//         if(req.isAuthenticated()){
//             Campground.findById(id, (err, camp)=>{
//                 if(!err){
//                     //does user own campground
//                     if(camp.user.id.equals(req.user._id)){
//                         next();
//                     }else{
//                         res.redirect("back");
//                     }
//                 }else{
//                     res.redirect("back");
//                 }
//             });
//         }
//     };

middlewareObject.commentsOwnership = function authorization(req, res, next){
    var cid = req.params.cid;
    //if user is authenticated
    if(req.isAuthenticated()){
        Comments.findById(cid, (err, comment)=>{
            if(!err){
                //does user own campground
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Sorry, You are not the author of this comment");
                    res.redirect("back");
                }
            }else{
                req.flash("error", "Sorry, Couldn't find this comment");
                res.redirect("back");
            }
        });
    }else{
        req.flash("error", "Sorry, You are not Logged in");
        res.redirect("/login")
    }
};


module.exports = middlewareObject;