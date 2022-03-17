const express = require("express")
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express()

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    console.log(req.user)
    res.send(`Welcome ${req.user.displayName}`)
})

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);
app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.listen(3000, ()=>{
    console.log("Sever running at 3000")
})

