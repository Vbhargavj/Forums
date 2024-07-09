const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'review can not be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
 
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'HUser',
    required: [true, 'review must from user']
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const HReview = mongoose.model('HReview', reviewSchema);
module.exports = HReview;