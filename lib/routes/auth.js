'use strict';

var jwt = require('lib/auth/jwt/jwt.js');
var express = require('express');
var router = express.Router();

var unAuthorizedError = require('lib/errors.js').unAuthorizedError;

module.exports = function(passport) {

  router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  router.get('/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err) {
        next(err);
      } else if (!user) {
        next(unAuthorizedError(info));
      } else {
        // Generate the token.
        var token = jwt.sign({id: user.id});
        res.json({token: token});
      }
    })(req, res, next);
  });

  return router;
};



