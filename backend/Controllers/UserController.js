const User = require('../Model/UserModel')
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');
const factory = require("../Controllers/handlerFactory")
exports.getUserPhoto = async (req, res) => {
    const photo = req.user.photo;
    res.status(200).json({ photo })
}


exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
exports.updateMe = CatchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    console.log('this is hit update me');
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});
exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.postUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.patchUser = factory.updateOne(User);
