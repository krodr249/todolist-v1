//jshint esversion:6
// Require the packages
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//Tells our app that we will be using ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let newItems = ["Study!","Draw something"];

app.get("/", function(req, res){

  let today = new Date();
  let weekday ={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", weekday);

  res.render("list", {kindOfDay:day,newItems:newItems});

});

//When a post request gets triggered in our home route,
//well save value of new item and will redirect to home route, which triggers app.get function.
app.post("/", function(req,res){
  let item = req.body.newItem;
  newItems.push(item);
  res.redirect("/");
})


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
