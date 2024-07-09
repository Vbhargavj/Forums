const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HUser',
    required: [true, 'Forum must have a user'],
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: [true, 'Forum must have a tag'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

forumSchema.index({title: 1 })
forumSchema.virtual('reviews', {
  ref: 'HReview',
  foreignField: 'forum',
  localField: '_id',
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
