'use strict';

var jwt = require('lib/auth/jwt/jwt-middleware.js');

var express = require('express');
var router = express.Router();


module.exports = function(Parse) {

  router.all('/*', jwt);
  router.get('/', function(req, res) {
    res.json(200, 'Awesome to be API');
  });

  return router;
};
