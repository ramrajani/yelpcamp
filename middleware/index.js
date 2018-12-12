var campground =require("../models/campground");
var comment =require("../models/comment");

var middlewareObj={};

middlewareObj.checkOwnership= function(req,res,next){
        campground.findById(req.params.id,function(err,camp){
        if(err)
            console.log(err);
        else{
            if(req.isAuthenticated()){
               if (camp.author.id.equals(req.user._id)){
                next();
                }
                else{
                    res.redirect("back");
                }
            }
            else{
                res.redirect("back");
            }
        }
    })
}

middlewareObj.checkCommentOwnership= function(req,res,next){
    comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err)
            console.log(err);
        else{
            if(req.isAuthenticated()){
               if(foundcomment.author.id.equals(req.user._id)){
                next();
                }
                else{
                    res.redirect("back");
                }
            }
            else{
                res.redirect("back");
            }
        }
    })
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports= middlewareObj