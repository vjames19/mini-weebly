'use strict';

var jwtOptions = require('lib/auth/auth.js').jwtOptions;
var jwt = require('jsonwebtoken');

if(!jwtOptions.secret) {
  throw new Error('Secret should be specified');
}

var secret = jwtOptions.secret;

exports.sign = function(payload, expiresInMinutes) {
  var options = {
    issuer: jwtOptions.issuer,
    audience: jwtOptions.audience,
    expiresInMinutes: expiresInMinutes || jwtOptions.expiresInMinutes
  };
  return jwt.sign(payload, secret, options);
};


exports.verify = function(token, callback) {
   jwt.verify(token, secret, jwtOptions, callback);
};
