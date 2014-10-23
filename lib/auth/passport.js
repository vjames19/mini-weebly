'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  (function google() {
    var cb = function(token, refreshToken, profile, done) {
      process.nextTick(function() {

        // TODO(vjames19): Find user in database and decided if its needs to be created.
        return done(null, profile);
      });
    };

    var options = {
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    };

    passport.use(new GoogleStrategy(options, cb));
  })();


};
