var express = require("express");
var router  = express.Router({mergeParams:true});
var campground =require("../models/campground");
var comment =require("../models/comment");
var middle= require("../middleware/index");


router.post("/",middle.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,foundCampground){
        if(err)
            console.log(err);
        else{
            comment.create(req.body.comment,function(err,comment){
                    if(err)
                        console.log(err);
                    else{
                        comment.author.id=req.user._id;
                        comment.author.username=req.user.username;
                        comment.save();
                        foundCampground.comments.push(comment);
                        foundCampground.save();
                        res.redirect("/campgrounds/"+foundCampground._id);
                    }
            });
            
        }
    })
})

router.get("/new",middle.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,foundCampground){
        if(err)
            console.log(err);
        else
            res.render("comments/new",{campground: foundCampground});
    })
})

router.get("/:comment_id/edit",middle.checkCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err,comm){
        if(err)
            console.log(err);
        else
            res.render("comments/edit",{campground_id:req.params.id, comment:comm});
    })
});

router.put("/:comment_id",middle.checkCommentOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comments){
        if(err)
            console.log(err)
        else
            res.redirect("/campgrounds/"+req.params.id);
    })
})

router.delete("/:comment_id",middle.checkCommentOwnership,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,req.body.comment,function(err){
        if(err)
            console.log(err)
        else
            res.redirect("/campgrounds/"+req.params.id);
    })
})


module.exports=router;