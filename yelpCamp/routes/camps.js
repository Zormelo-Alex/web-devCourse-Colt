const express = require("express");
const router = express.Router();
const Campground = require("../models/camps");
const Comments = require("../models/comments");


router.get("/campGrounds", (req,res)=>{
    //var user = req.user;
    Campground.find({},(err, camps)=>{
        if(!err){
            //console.log(req.user);
            res.render("campgrounds/index", {sites: camps});
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("/");
        }
    });
});

router.post("/campGrounds", isLoggedIn, (req, res)=>{
    //get data in form
    var siteName = req.body.name;
    var url = req.body.image;
    var price = req.body.price;
    var description = req.body.disc;
    var user = {username:req.user};
    //making the object
    //console.log(user);
    var newCampSite = {name: siteName, img: url, price:price, description: description, user: user};
    //add to database
    Campground.create(newCampSite, (err, camps)=>{
        if(!err){
            camps.user.username = req.user.username;
            camps.user.id = req.user._id;
            camps.save();
            //console.log(camps);
            //redirct back to campGrounds
            res.redirect("/campGrounds");
        }else{
            req.flash("error", "Sorry, Unexpected error!");
            res.redirect("/campGrounds");
        }
    });
    
});

router.get("/campGrounds/new", isLoggedIn, (req,res)=>{
    //var user = req.user;
    res.render("campgrounds/new");
});

router.get("/campGrounds/:id", (req, res)=>{
    //var user = req.user;
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec((err, foundCampground)=>{
        if(!err){
            //console.log(req.user);
            res.render("campgrounds/show", {campground: foundCampground});
        }else{
            req.flash("error", "Sorry, couldn't find the campground");
            res.redirect("/campGrounds");
        }
    });
    
});

router.get("/campGrounds/:id/delete", isLoggedIn, (req, res)=>{
    var id = req.params.id;
    Campground.findById(id, (err, camp)=>{
        if(req.user.username == camp.user.username){
            Campground.findByIdAndDelete(id).populate("comments").exec((err, data)=>{
                if(!err){
                    //running a loop to get all comments in db
                    data.comments.forEach((comment)=>{
                        //deleting all assoiciated comments from the database
                        Comments.findByIdAndDelete(comment.id, (err, deletedComment)=>{
                            if(!err){
                                console.log("All associated comments deleted");
                            }else{
                                console.log(err);
                            }
                        })
                    });
                    req.flash("success", "You deleted a Campground");
                    res.redirect("/campGrounds");
                }else{
                    req.flash("error", "Sorry, couldn't find the campground");
                    res.redirect("/campGrounds/"+id);
                }
            }); 
        }else{
            req.flash("error", "Sorry, You're not the author of this post");
            res.redirect("/campGrounds/"+id);
        }
    });
});

router.get("/campGrounds/:id/update", isLoggedIn, (req, res)=>{
    var id = req.params.id;
        Campground.findById(id, (err, camp)=>{
            if(!err){
                //does user own campground
                if(req.user.username == camp.user.username){
                    res.render("campgrounds/edit", {camp});
                }else{
                    req.flash("error", "Sorry, You are not the author of this Campground");
                    res.redirect("/campGrounds");
                }
            }else{
                req.flash("error", "Sorry, couldn't find the campground");
                res.redirect("/campGrounds");
            }
        });
});

router.post("/campGrounds/:id/update", isLoggedIn, (req, res)=>{
    var id = req.params.id;
    var updateInfo = {
        // user: {
        //     username: req.user.username,
        //     id: req.user._id
        // },
        name: req.body.name,
        img: req.body.image,
        price: req.body.price,
        description: req.body.disc,
    }
    Campground.findByIdAndUpdate(id, updateInfo, (err, camp)=>{
        if(!err){
            if(camp.user.username == req.user.username){
                camp.save();
                res.redirect("/campGrounds/"+id);
            }else{
                req.flash("error", "Sorry, You are not the author of this Post");
                res.redirect("/campGrounds");
            }
        }else{
            req.flash("error", "Sorry, Couldn't find the campground");
            res.redirect("/campGrounds");
        }
    });
});

//middlewares
function isLoggedIn(req, res, next){
    //check if iser is authenticated
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Sorry, you're not Logged in!");
    res.redirect("/login");
}

// function authorization(req, res, next){
//     var id = req.params.id;
//     //if user is authenticated
//     if(req.isAuthenticated()){
//         Campground.findById(id, (err, camp)=>{
//             if(!err){
//                 //does user own campground
//                 if(camp.user.id.equals(req.user._id)){
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