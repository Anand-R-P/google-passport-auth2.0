const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET_ID;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  })
);
