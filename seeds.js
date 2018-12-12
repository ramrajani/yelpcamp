var mongoose    = require("mongoose"),
    comment     = require("./models/comment.js"),
    campground  = require("./models/campground.js");


// mongoose.connect("mongodb://localhost:27017/yelp_camp",useNewUrlParser({extended:true}));
var data=[
        {
            name: "Matheran",
            image: "https://image3.mouthshut.com/images/imagesp/925003649s.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
        {
            name: "Mahableshwar",
            image: "https://www.trawell.in/admin/images/upload/895207722Mahabaleshwar_Savitri_Point_Main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
        
        {
            name: "Shenandoah",
            image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut tellus dapibus, sagittis ex in, dictum augue. Suspendisse ut mi auctor, pulvinar tortor non, hendrerit leo. Nulla in posuere tortor. Nulla finibus leo sem, vitae varius leo tempus sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis rhoncus, purus quis auctor scelerisque, velit lacus egestas augue, in pellentesque felis urna vel ipsum. Nullam a elementum tortor, eget hendrerit lorem."
        },
    ]
function seedDB(){
    campground.remove({},function(err){
    if(err)
        console.log(err);
    else
        console.log("deleted");
})
    data.forEach(function(seed){
        campground.create(seed,function(err,camp){
        if(err)
            console.log(err);
        else{
            comment.create({
                text:"This place is awesome, I wish I could stay there forever",
                author:"Your boy"
            },function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    if (typeof camp.comments != 'undefined' ){
                        camp.comments.push(comment);
                        camp.save();
                        console.log(camp);
                        console.log("COmmenr added")
                    }
                }
            })
        }
    })
    })
    
}
    
module.exports=seedDB;