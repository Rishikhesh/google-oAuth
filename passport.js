const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use( new GoogleStrategy({
        clientID:"1017358758167-6a925e2ekr1kbgvgjepupsl48csfbe8q.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
