var express = require('express');
var router = express.Router();


module.exports = function(passport) {
  router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  router.get('/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, profile, info) {
      if (err) {
        next(err);
      } else if (!profile) {
        res.redirect('/');
      } else {
        res.redirect('/profile');
      }
    })(req, res, next);
  });

  return router;
};



