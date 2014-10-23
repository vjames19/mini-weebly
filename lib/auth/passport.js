'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport, Parse) {
  var User = require('lib/models/user.js')(Parse);

  (function google() {
    var cb = function(token, refreshToken, profile, done) {
      process.nextTick(function() {

        var userPromise = User.query().equalTo('profileId', profile.id).find().then(function(users) {
          if(users.length === 0) {
            // create the user since its not in the database.
            var userProperties = {
              name: profile.displayName,
              email: profile.emails[0].value,
              profileId: profile.id,
              token: token
            };
            return User.create(userProperties).then(function(user) {
              return user;
            });
          } else {
            // The user is already in the database.
            return users[0];
          }
        });

        userPromise.then(function(user) {
          done(null, user);
        });

        userPromise.fail(function(error) {
          done(error, error.message);
        });
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
