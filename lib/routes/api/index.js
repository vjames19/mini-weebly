'use strict';

var verifyJsonWebToken = require('lib/auth/jwt/jwt-middleware.js');

var express = require('express');
var router = express.Router();


module.exports = function(Parse) {
  var getUserFromDataBase = require('lib/middleware/user.js')(Parse);
  router.all('/*', verifyJsonWebToken, getUserFromDataBase);

  var pages = require('lib/routes/api/pages.js')(Parse);
  router.use('/', pages);

  return router;
};
