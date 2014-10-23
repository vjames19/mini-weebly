var express = require('express');
var router = express.Router();

module.exports = function(Parse) {

  router.get('/', function(req, res) {
    res.json(200, 'Awesome to be API');
  });

  return router;
};
