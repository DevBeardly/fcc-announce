var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
var Comment    = require('../models/comment');
var middleware = require('../middleware');

// INDEX - show all campgrounds
router.get('/', function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
router.post('/', middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = { name: name, image: image, description: description, price: price, author: author };

  // Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

// NEW - display form to create new campground
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
    if (err || !foundCampground) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      // render show template with that campground
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

// EDIT - display form to update a campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      req.flash('error', 'Could not find that campground');
      res.redirect('back');
    } else {
      res.render('campgrounds/edit', { campground: foundCampground });
    }
  });
});

//UPDATE - push edits to database
router.put('/:id', middleware.checkCampgroundOwnership, function (req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
    if (err) {
      req.flash('error', 'Could not find that campground');
      res.redirect('back');
    } else {
      // redirect somewhere (show page)
      req.flash('success', 'Successfully updated your campground!');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY - delete a campground
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      req.flash('error', 'Something went wrong with the database.');
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Successfully deleted your campground!');
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
