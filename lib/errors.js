'use strict';

exports.create = function(status, message) {
  var error = new Error(message);
  error.status = status;
  return error;
};


exports.unAuthorizedError = function(message) {
  return exports.create(401, message);
};

