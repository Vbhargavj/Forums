const express = require("express");

const router = express.Router();
const userController = require("../Controllers/UserController");
const authController = require("../Controllers/AuthController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get('/isLogin', authController.isLoggedIn)
router.use(authController.protect)
router.post('/logout', authController.logOut)
router.get('/photo', userController.getUserPhoto);

router.route('/update-password').patch(authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);

router.route('/updateMe').patch(userController.updateMe);
router.route('/deleteMe').delete(authController.deleteMe);

router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.postUser);

router
    .route('/:id')
    .delete(userController.deleteUser)
    .patch(userController.patchUser)
    .get(userController.getUser);

module.exports = router;