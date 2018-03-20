var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');
var Announcement = require('../models/announcement');
var middleware = require('../middleware');

// ADMIN DASHBOARD LANDING
router.get('/', middlewareObj.isLoggedIn, function (req, res) {
  Announcement.find({}, function (err, allAnnouncements) {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/index', { announcements: allAnnouncements });
    }
  });
});

module.exports = router;
