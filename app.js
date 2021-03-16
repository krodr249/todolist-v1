//jshint esversion:6
// Require the packages
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
//Tells our app that we will be using ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let newItems = ["Study!","Draw something"];
let workItems = [];

app.get("/", function(req, res){

  const day = date.getDate();
  res.render("list", {listTitle:day,newItems:newItems,route:"/"});

});
//When a post request gets triggered in our home route,
//well save value of new item and will redirect to home route, which triggers app.get function.
app.post("/", function(req,res){
  let item = req.body.newItem;
  newItems.push(item);
  res.redirect("/");
})

app.get("/work", function(rqe, res){
  res.render("list", {listTitle: "Work List", newItems: workItems, route:"/work"});
})

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req,res){
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
