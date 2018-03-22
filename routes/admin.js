var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');
var Announcement = require('../models/announcement');
var middleware = require('../middleware');

// ADMIN DASHBOARD LANDING
router.get('/', middleware.isEditor, function (req, res) {
  res.redirect('/admin/announcements');
});

// ADMIN ANNOUNCEMENTS PANEL
router.get('/announcements', middleware.isEditor, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/announcements', { announcements: allAnnouncements });
    }
  });
});

// ADMIN GROUPS PANEL
router.get('/groups', middleware.isEditor, function (req, res) {
  res.redirect('/admin/announcements');
});

// ADMIN CONNECT PANEL
router.get('/connect', middleware.isEditor, function (req, res) {
  res.redirect('/admin/announcements');
});

// ADMIN USERS PANEL
router.get('/users', middleware.isEditor, function (req, res) {
  User.find({}, function (err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/users', { users: allUsers });
    }
  });
});

module.exports = router;
