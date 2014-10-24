'use strict';

module.exports = function(Parse) {
  var Page = Parse.Object.extend('Page', {
    // Instance methods
  }, {
    // Class methods
    create: function(user) {
      var page = new Page();
      return page.save({
        user: user
      });
    },
    get: function(id, user) {
      return new Parse.Query(Page).equalTo('user', user).get(id);
    },
    update: function(page, properties) {
      // Don't allow to modify the user property on the page.
      delete properties.user;
      return page.save(properties);
    },
    getAll: function(user) {
      return new Parse.Query(Page).equalTo('user', user).ascending('createdAt').find();
    },
    destroy: function(id, user) {
      return Page.get(id, user).then(function(page) {
        return page.destroy();
      });
    }
  });

  return Page;
};
