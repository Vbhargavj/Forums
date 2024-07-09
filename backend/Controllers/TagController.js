const Tag = require('../Model/TagModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync')
const factory = require('./handlerFactory');

exports.deleteTag = factory.deleteOne(Tag);
exports.getAllTag = factory.getAll(Tag);
exports.addTag = factory.createOne(Tag);
exports.getTag = factory.getOne(Tag);
exports.updateTag = factory.updateOne(Tag);