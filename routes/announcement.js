var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Announcement = require('../models/announcement');
var middleware = require('../middleware');

// NEW - display form to create new announcement
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('announcements/new');
});

// CREATE - add new announcement to DB
router.post('/', middleware.isLoggedIn, function (req, res) {
  Announcement.create(req.body.announcement, function (err, newlyCreated) {
    if (err) {
      req.flash('error', 'Your announcement could not be saved. Please try again.');
      res.redirect('back');
    } else {
      req.flash('success', 'Your announcement was successfully created!');
      res.redirect('/admin');
    }
  });
});

// EDIT - display form to update a campground
router.get(':/id/edit', function (req, res) {
  Announcement.findById(req.params.id, function (err, foundAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      res.render('announcements/edit', {announcement: foundAnnouncement });
    }
  });
});

// UPDATE - push edits to DB
router.put('/:id', function (req, res) {
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully updated your announcement!');
      res.redirect('/admin');
    }
  });
});

// DESTROY - delete an announcement
router.delete('/:id', function (req, res) {
  Announcement.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      req.flash('error', 'Something went wrong with the database.');
      res.redirect('/admin');
    } else {
      req.flash('success', 'Successfully deleted your announcement.');
      res.redirect('/admin');
    }
  });
});

module.exports = router;