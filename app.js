require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}))

const userSchema = new mongoose.Schema( {
  email:String,
  password: String,
  googleId: String,
  secret: String
});



userSchema.plugin(findOrCreate);

// const url ="https://www.googleapis.com/auth/calendar";


// Google Auth Section


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/procrastinot_scheduler",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// All get requests


app.get("/", function(req, res){
  res.render("login");
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] }));


app.get('/auth/google/procrastinot_scheduler', 
passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.get("/add", function(req, res){
  res.render("add");
})

app.get("/profile", function(req, res){
  res.render("profile");
})

app.get("/dashboard", function(req, res){
  res.render("dashboard");
})


// All post requests



app.post("/", function(req, res){

  console.log("Success");
  res.render("dashboard");

  // https.get(url, "JSON", function(response){
  //   console.log(response.statusCode);
  // })
})








app.listen("3000", function(req, res){
  console.log("Server started on port 3000");
});