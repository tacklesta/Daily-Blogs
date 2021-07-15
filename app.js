const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Welcome to Daily Blogs";
const aboutContent = "I am an Engineer who loves learning new things everyday. I try to experiment and develop things which I wish can become true";
const contactContent = "To be updated";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

// for specifying the location to search for my css and images files in root directort.
app.use(express.static("public"));

var posts = [];

app.get('/',function(req, res){
  res.render ("home",{content: homeStartingContent, blogs: posts})

});

app.get('/about',function(req, res){
  res.render('about',{content: aboutContent})
});

app.get('/contact',function(req, res){
  res.render('contact',{content: contactContent})
});

app.get('/compose',function(req,res){
  res.render('compose')
});

app.get("/posts/:postName",function(req,res){

  const requestedTitle = lodash.lowerCase(req.params.postName)

  posts.forEach((i)=>{

    const storedTitle = lodash.lowerCase(i.title)

    if(storedTitle === requestedTitle)
    {
      res.render("post",{post_title: i.title , post_content: i.post})
    }
  })
});

app.post('/',function(req,res){
  const post = {
    title: req.body.title,
    post: req.body.compose
  }

  posts.push(post)
  res.redirect("/")
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
