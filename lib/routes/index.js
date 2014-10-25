'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(Parse, passport) {
  var api = require('lib/routes/api')(Parse);
  var auth = require('lib/routes/auth.js')(passport);
  var angular = require('lib/routes/angular.js');

  router.use('/auth', auth);
  router.use('/api', api);
  router.use('/', angular);

  return router;
};
