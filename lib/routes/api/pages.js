'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(Parse) {
  var Page = require('lib/models/page.js')(Parse);

  router.get('/pages', function(req, res, next) {
    Page.getAll(req.user).then(function(pages) {
      res.json(pages);
    }, function(err) {
      next(err);
    });
  });

  return router;
};
