const CatchAsync = require("../utils/CatchAsync");
const Forum = require("../Model/FormsModel");
const AppError = require("../utils/AppError");
const mongoose = require('mongoose');
const { name } = require("ejs");

exports.addForum = CatchAsync(async (req, res, next) => {
  const newForum = await Forum.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user._id,
    tag: req.body.category
  });
  if (!newForum) {

    return next(new AppError('something error in crating tag'))
  }
  res.json({ status: "success", msg: "created" });
});

exports.updateForm = (req, res, next) => {
  const id = req.params.id;
};

exports.getForum = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid forum ID', 400));
  }

  const result = await Forum.findOne({ _id: id })
    .populate({
      path: "user",
      select: "name",
    }).populate({
      path: "tag",
      select: "name color"
    }).populate({
      path: "reviews"
    });


  if (!result) {
    return next(new AppError("forum with id " + id + " not found", 404));
  }

  res.status(200).json({ result });
});


exports.getAllForum = CatchAsync(async (req, res, next) => {
  // const { search, category, user } = req.query;
  
  let filter=req.body
  const { title } = req.query;
  if (title) {
    // Use a regex to match titles that contain the search term, case-insensitively
    filter.title = { $regex: title, $options: 'i' };
  }

  console.log(req.query)
console.log(filter);
  // Create a filter object
  console.log(title);

  const result = await Forum.find( filter )
    .populate({
      path: "user",
      select: "name ",
    })
    .populate({
      path:"tag",
      select:"name color"
    })
    ;

  if (!result) {
    return next(new AppError("forum with id" + id + " not found", 404));
  }
  res.status(200).json({ result });
});

exports.getAllForumWithReview = CatchAsync(async (req, res, next) => {
  // const { search, category, user } = req.query;
  
 

  const result = await Forum.find( filter )
    .populate({
      path: "user",
      select: "name ",
    })
    .populate({
      path:"tag",
      select:"name color"
    })
    .populate({
      path: "reviews"
    });

  if (!result) {
    return next(new AppError("forum with id" + id + " not found", 404));
  }
  res.status(200).json({ result });
});