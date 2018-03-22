var Announcement = require('../models/announcement');
var User = require('../models/user');

// all the middleware goes here

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
};

middlewareObj.isAdmin = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      next();
    }
  }

  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
};

module.exports = middlewareObj;
