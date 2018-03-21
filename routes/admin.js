var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');
var Announcement = require('../models/announcement');
var middleware = require('../middleware');

// ADMIN DASHBOARD LANDING
router.get('/', middleware.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/index', { announcements: allAnnouncements });
    }
  });
});

// ADMIN ANNOUNCEMENTS PANEL
router.get('/announcements', middleware.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/announcements', { announcements: allAnnouncements });
    }
  });
});

// ADMIN GROUPS PANEL
router.get('/', middleware.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/groups', { announcements: allAnnouncements });
    }
  });
});

// ADMIN CONNECT PANEL
router.get('/', middleware.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/connect', { announcements: allAnnouncements });
    }
  });
});

// ADMIN USERS PANEL
router.get('/', middleware.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/users', { announcements: allAnnouncements });
    }
  });
});

module.exports = router;
