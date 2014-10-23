'use strict';

module.exports = function(Parse) {
  var User = Parse.Object.extend('AUser', {
    // Instance methods.
  }, {
    // Class methods.
    get: function(id) {
      return new Parse.Query(User).get(id);
    },
    query: function() {
      return new Parse.Query(User);
    },
    create: function(userProperties) {
      var user = new User();
      console.log('user props', userProperties);
      return user.save({
        name: userProperties.name,
        email: userProperties.email,
        token: userProperties.token,
        profileId: userProperties.profileId
      });
    }
  });

  return User;
};
