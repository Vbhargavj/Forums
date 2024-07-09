const CatchAsync = require('./../utils/CatchAsync');

const Review = require('./../Model/reviewModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/AppError');

exports.setForumsId = (req, res, next) => {
  if (!req.body.forum) req.body.forum = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.body.forum);
  console.log(req.body.user);
  next();
};

exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);

exports.createReview = async (req, res, next) => {
  const {rating,review}=req.body;
  const newReview = await Review.create({
    user: req.user._id,
    rating,
    forum: req.body.forum,
    review,
    createdAt: new Date() // Set the current date and time
});

  if(!newReview){
    return next(new AppError("review was not created",400))
  }
  res.status(201).json({
    status:"success",
    review: newReview
  })
}

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);