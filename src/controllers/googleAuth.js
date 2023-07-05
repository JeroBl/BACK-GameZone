const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { Users } = require("../db")
require("dotenv").config()

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } = process.env

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  }, async function(accessToken, refreshToken, profile, cb) {
      //console.log(req.user)
      console.log(profile, "estos datos son del logueo");

      let newUser = {
        name : profile.name.givenName,
        user_name : profile.displayName,
        email : profile.emails[0].value,
        profileImage : profile.photos[0].value
      }

      //Users.findOrCreate({
      //  where: { email: profile.emails[0].value },
      //  defaults: {
      //    name: profile.displayName,
      //    email: profile.emails[0].value,
      //    profileImage: profile.photos[0].value
      //  }
      //})

      try {

        let user = await Users.findOne({where : {email: profile.emails[0].value}})
        if (user) {

          console.log(user, "estos son de la base de datos")
          cb(null, user)
        }else{
          user = await Users.create(newUser)
          cb(null, user)
        }

      } catch (error) {
        console.error(error)
      }
  
      //cb(null, profile);
    }
    //por el momento no guardaremos nada en la base de datos
    //cb(null, profile)

));

passport.serializeUser((user, done) => {
  console.log("users", user)
  done(null, user)
  //req.user = user
})

passport.deserializeUser((user, done, req, res) => {

  //req.user = user
  
  done(null, user)
})