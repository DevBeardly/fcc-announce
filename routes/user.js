var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

// USER PROFILE DASHBOARD ROUTE
router.get('/', middleware.isLoggedIn, function (req, res) {
  res.render('user/index');
});

// EDIT USER INFO ROUTE
router.get('/:id/edit', middleware.isLoggedIn, function (req, res) {
  res.send('YOU\'VE REACHED THE USER EDIT ROUTE!');
  // User.findById(req.params.id, function (err, foundUser) {
  //   if (err) {
  //     req.flash('error', 'Could not find that user.');
  //     res.redirect('back');
  //   } else {
  //     res.render('user/edit', { user: foundUser });
  //   }
  // });
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
