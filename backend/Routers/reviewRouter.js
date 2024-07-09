const express = require('express');

const reviewController = require('../Controllers/reviewController');
const authController = require('../Controllers/AuthController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/:id')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setForumsId,
    reviewController.createReview
  );

  
router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
