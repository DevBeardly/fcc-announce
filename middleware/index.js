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
      return next();
    } else {
      req.flash('error', 'You don\'t have permission to do that. Ask an admin for help');
      res.redirect('back');
    }
  }

  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
};

module.exports = middlewareObj;
