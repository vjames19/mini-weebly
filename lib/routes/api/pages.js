'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(Parse) {
  var Page = require('lib/models/page.js')(Parse);

  // pages
  var pagesRoute = router.route('/pages');
  pagesRoute.get(function(req, res, next) {
    Page.getAll(req.user).then(function(pages) {
      res.json(pages);
    }, next);
  });

  pagesRoute.post(function(req, res, next) {
    Page.create(req.user).then(function(page) {
      res.json(page);
    }, next);
  });

  // page
  router.param('id', function(req, res, next, id) {
    Page.get(id, req.user).then(function(page) {
      req.pageModel = page;
      next();
    }, next);
  });

  var pageRoute = router.route('/page/:id');
  pageRoute.get(function(req, res) {
    res.json(req.pageModel);
  });

  pageRoute.put(function(req, res, next) {
    Page.update(req.pageModel).then(function(page) {
      res.json(page);
    }, next);
  });

  return router;
};
