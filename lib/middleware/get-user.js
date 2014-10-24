'use strict';

module.exports = function(Parse) {
  var User = require('lib/models/user.js')(Parse);

  var getUserFromDatabase = function(req, res, next) {
    var userId = req.user.id;
    User.get(userId).then(function(user) {
      req.user = user;
      next();
    }, function(error) {
      next(error);
    });
  };

  return getUserFromDatabase;
};
