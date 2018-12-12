var express = require("express");
var router  = express.Router({mergeParams: true});
var campground =require("../models/campground");
var middle= require("../middleware/index");

router.get("/",function(req,res){
   campground.find({},function(err,campgrounds){
       if(err){
           console.log(err);
       }
       res.render("campgrounds/index",{camps:campgrounds});
   });
   // res.render("index",);
});

router.get("/new",middle.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})

router.delete("/:id/delete",middle.checkOwnership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
            console.log(err);
        else
            console.log("Deleted");
            res.redirect("/campgrounds");
    });
})

router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});            
        }
    });
})

router.get("/:id/edit",middle.checkOwnership,function(req,res){
    campground.findById(req.params.id,function(err,camp){
        if(err)
            console.log(err);
        else{
            res.render("campgrounds/edit",{campground:camp});
        }
    });
})

router.put("/:id/edit",middle.checkOwnership,function(req,res){
        campground.findByIdAndUpdate(req.params.id, req.body.camp,function(err,campg){
        if(err)
            console.log(err);
        else{
            res.redirect("/campgrounds/"+campg._id);
        }
    })
})

router.post("/",middle.isLoggedIn,function(req,res){
    var name=req.body.campName;
    var image=req.body.url;
    var description=req.body.desc;
    var newcamp={
                    name: name, 
                    image: image, 
                    description:description,
                },
        author={
            id: req.user._id,
            username: req.user.username
        }        
                
    campground.create(
    {
        name: name, 
        image: image,
        description:description,
        author: author
    },function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }  
)
res.redirect("/campgrounds");
})



module.exports=router;