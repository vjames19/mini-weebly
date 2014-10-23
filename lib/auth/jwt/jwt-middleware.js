'use strict';
var unAuthorizedError = require('lib/errors.js').unAuthorizedError;
var jwt = require('lib/auth/jwt/jwt.js');

module.exports = function(req, res, next) {
  var authorizationHeader = req.get('authorization');
  var token;
  if (authorizationHeader) {
    var parts = authorizationHeader.trim().split(' ');
    if(parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return next(unAuthorizedError('Invalid Authorization format. The format is Authorization: Bearer token'));
      }
    }  else {
      return next(unAuthorizedError('Invalid Authorization format. The format is Authorization: Bearer token'));
    }
  } else {
    return next(unAuthorizedError('No authorization header found.'));
  }

  // verify the token
  jwt.verify(token, function(err, decoded) {
    if(err) {
      return next(unAuthorizedError(err));
    }
    req.user = decoded;
    next();
  });

};
