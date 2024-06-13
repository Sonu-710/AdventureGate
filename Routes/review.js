const express = require("express");
const reviewController = require("./../Controllers/reviewController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo("user"), reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
