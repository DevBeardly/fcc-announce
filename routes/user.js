var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

// USER PROFILE DASHBOARD ROUTE
router.get('/', middleware.isLoggedIn, function (req, res) {
  res.render('user/index');
});

// EDIT CURRENT USER INFO ROUTE
router.get('/edit', middleware.isLoggedIn, function (req, res) {
  res.render('user/edit');
});

// UPDATE CURRENT USER INFO ROUTE
router.put('/', middleware.isLoggedIn, function (req, res) {
  res.send('You\'ve hit the user UPDATE route.');
});

router.get('/reset', middleware.isLoggedIn, function (req, res) {
  res.render('user/reset');
});

// SUBMIT A NEW ANNOUNCEMENT ROUTE
// EDIT AN UNAPPROVED ANNOUNCEMENT ROUTE
// ^^ DO THESE BOTH THROUGH THE ANNOUNCEMENTS ROUTES, VIA MIDDLEWARE LOGIC

module.exports = router;
