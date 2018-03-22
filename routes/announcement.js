var express = require('express');
var expressSanitizer = require('express-sanitizer');
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
  req.body.announcement.description = req.sanitize(req.body.announcement.description);
  Announcement.create(req.body.announcement, function (err, announcement) {
    if (err) {
      req.flash('error', 'Your announcement could not be saved. Please try again.');
      res.redirect('back');
    } else {
      announcement.author.id = req.user._id;
      announcement.author.fullname = req.user.fullname;

      announcement.save();

      req.flash('success', 'Your announcement was successfully created!');
      res.redirect('/admin');
    }
  });
});

// EDIT - display form to update an announcement
router.get('/:id/edit', function (req, res) {
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
  req.body.announcement.dateUpdated = Date.now();
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      req.flash('success', 'Successfully updated your announcement!');
      res.redirect('/admin/announcements');
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
      res.redirect('/admin/announcements');
    }
  });
});

// APPROVE
router.get('/:id/approve', function (req, res) {
  req.body.announcement.isApproved = true;
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      console.log(updatedAnnouncement);
      req.flash('success', 'That announcement has been approved!');
      res.redirect('back');
    }
  });
});

// UNAPPROVE
router.get('/:id/unapprove', function (req, res) {
  req.body.announcement.isApproved = false;
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      req.flash('success', 'That announcement is no longer approved!');
      res.redirect('back');
    }
  });
});

// PUBLISH
router.get('/:id/publish', function (req, res) {
  req.body.announcement.isPublished = true;
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      req.flash('success', 'That announcement has been published!');
      res.redirect('back');
    }
  });
});

// UNPUBLISH
router.get('/:id/unpublish', function (req, res) {
  req.body.announcement.isPublished = false;
  Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function (err, updatedAnnouncement) {
    if (err) {
      req.flash('error', 'Could not find that announcement.');
      res.redirect('back');
    } else {
      req.flash('success', 'That announcement is no longer published!');
      res.redirect('back');
    }
  });
});

module.exports = router;