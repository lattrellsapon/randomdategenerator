const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  dateName: {
    type: String,
    required: true,
  },
  dateDescription: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('date', DateSchema);
