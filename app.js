require('dotenv').config();
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

const userSchema = new mongoose.Schema( {
  email:String,
  password: String,
  googleId: String,
  secret: String
});



userSchema.plugin(findOrCreate);

const url ="https://www.googleapis.com/auth/calendar";


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


app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] }));


app.get('/auth/google/procrastinot_scheduler', 
passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});



app.post("/", function(req, res){

  https.get(url, "JSON", function(response){
    console.log(response.statusCode);
  })
})



app.get("/", function(req, res){
    res.send("Hello World");
});




app.listen("3000");