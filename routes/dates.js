const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Bring in auth middleware as all of these routes are private
const auth = require('../middleware/auth');

// Bring in Date model
const User = require('../models/User');
const Date = require('../models/Date');

// @route   GET api/contacts
// @desc    Get all users date ideas
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const dates = await Date.find({ user: req.user.id }).sort({ date: -1 });

    res.json(dates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add a new date idea
// @access  Private
router.post(
  '/',
  [auth, [check('dateName', 'Date Name is required').not().isEmpty()]],
  async (req, res) => {
    // Check if there are errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Carry on if all criterias are met
    const { dateName, dateDescription } = req.body;

    try {
      const newDate = new Date({
        dateName,
        dateDescription,
        user: req.user.id,
      });

      const date = await newDate.save();

      res.json(date);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update user's date idea
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { dateName, dateDescription } = req.body;

  // Build a date object
  const dateFields = {};

  if (dateName) dateFields.dateName = dateName;
  if (dateDescription) dateFields.dateDescription = dateDescription;

  try {
    let date = await Date.findById(req.params.id);

    if (!date) {
      return res.status(404).json({
        msg: 'Date Idea not found',
      });
    }

    // Make sure user owns the date idea
    if (date.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorised',
      });
    }

    // If all goes well, carry on
    date = await Date.findByIdAndUpdate(
      req.params.id,
      { $set: dateFields },
      { new: true }
    );

    res.json(date);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete user's date idea
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let date = await Date.findById(req.params.id);

    if (!date) {
      return res.status(404).json({
        msg: 'Date Idea not found',
      });
    }

    // Make sure user owns the date idea
    if (date.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not Authorised',
      });
    }

    await Date.findByIdAndRemove(req.params.id);

    res.json({
      msg: 'Date Idea Removed',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
