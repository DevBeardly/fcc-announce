var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

// USER PROFILE DASHBOARD ROUTE
router.get('/', middleware.isLoggedIn, function (req, res) {
  User.findById(req.user._id, function (err, foundUser) {
    if (err) {
      req.flash('error', 'We couldn\'t find you, please try again.');
      res.redirect('/');
    } else {
      res.render('user/index', { user: foundUser });
    }
  });
});

// NEW USER FORM
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('user/new');
});

// CREATE - ADD USER TO DB
router.post('/', middleware.isLoggedIn, function (req, res) {
  if (req.body.isEditor == "on") {
    var userEditor = true;
  } else if (req.body.isAdmin == "on") {
    var userAdmin = true;
  } else {
    userEditor = false;
    userAdmin = false;
  }
  var newUser = new User(
    { username: req.body.username, 
      fullname: req.body.fullname,
      isAdmin: userAdmin,
      isEditor: userEditor,
    });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/user/new');
    }

    passport.authenticate('local')(req, res, function () {
      req.flash('success', 'New user added: ' + user.fullname);
      res.redirect('/admin/users');
    })
  });
});

// EDIT USER INFO ROUTE
router.get('/:id/edit', middleware.isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, foundUser) {
    if (err) {
      req.flash('error', 'Could not find that user.');
      res.redirect('back');
    } else {
      res.render('user/edit', { user: foundUser });
    }
  });
});

// UPDATE USER INFO ROUTE
router.put('/:id', middleware.isLoggedIn, function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedUser) {
    if (err) {
      req.flash('error', 'Could not find that user.');
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully updated that user!');
      res.redirect('/admin/users');
    }
  });
});

// DELETE USER INFO ROUTE
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      req.flash('error', 'Something went wrong with the database.');
      res.redirect('/admin/users');
    } else {
      req.flash('success', 'Successfully deleted that user.');
      res.redirect('/admin/users');
    }
  });
});

router.get('/reset', middleware.isLoggedIn, function (req, res) {
  res.render('user/reset');
});

// SUBMIT A NEW ANNOUNCEMENT ROUTE
// EDIT AN UNAPPROVED ANNOUNCEMENT ROUTE
// ^^ DO THESE BOTH THROUGH THE ANNOUNCEMENTS ROUTES, VIA MIDDLEWARE LOGIC

module.exports = router;
