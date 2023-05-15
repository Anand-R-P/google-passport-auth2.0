const express = require("express");
const app = express();
require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport.js");

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        console.log(req.user)
        next()
    }else {
        res.status(401).send("something wrong");
    }
}

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.json("YOU ARE NOT LOGGED IN");
});

app.get("/failed", (req, res) => {
  res.json("Loggin failure");
});

app.get("/success",isLoggedIn, (req, res) => {
  res.json("welocome " + req.user.email);
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/')
})

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failed',
}),
    function (req, res) {
        res.redirect('/success')
    }
)

app.listen(PORT, console.log("server running ", PORT));
