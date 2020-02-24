var express         = require('express');                       //framework/package used here
var app             = express();                                //executing it
var bodyparser      = require("body-parser"),                   //middleware to convert the content on the page to req.body
    mongoose        = require("mongoose"),                      //package which provides a way to communicate with mongodb in a easy manner
    seedDB          = require("./seeds"),                       //it is a user created file to seed the database
    comment         = require("./models/comment"),              //importing the comment model from other file
    campground      = require("./models/campground"),           //importing the campground model from other file
    passport        = require("passport"),                      //tool to check for login and stuff, this could also be used for stuff like sign in with fb,gmail,etc
    LocalStrategy   = require("passport-local"),                //tool for a local login i.e. on our own page
    User            = require("./models/user"),                 //importing the users model from other file
    methodOverride  = require("method-override");               //used to overwrite methods i.e. converting post to put 
    
    var commentRoutes       = require("./routes/comments"),     // all the routes associated with the comments
        campgroundRoutes    = require("./routes/campgrounds"),  // all the routes associated with the Campgrounds
        authRoutes          = require("./routes/auth");         // all the routes associated with the authorisation stuff
    


mongoose.connect("mongodb+srv://tarun:tarun@cluster0-a0vpp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }); //connecting the database "yelp_camp" to the file
// seedDB(); 

app.use(bodyparser.urlencoded({extended: true}));                                   //app.use("url_part",function), it only responds to the request conatining "url_part", as no url_part is there it acts as middleware and parses the entire page, true indicates to deep parse 

app.use(methodOverride("_method"));                                                 //use overwrite when you encounter _method
app.set("view engine","ejs");                                                       //setting the view directory that it contains all ejs files  
app.use(express.static(__dirname+"/public"));                                       //static files goes here like css

app.use(require("express-session")({
    secret: "Oliver Queen is the Green Arrow",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})

    app.use("/campgrounds",campgroundRoutes);
    app.use("/campgrounds/:id/comments",commentRoutes);
    app.use(authRoutes);
    
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Yelpcamp Server is Running");
});
