const Review = require("./../Models/reviewModel");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({});
  res.status(200).json({
    status: "success",
    data: {
      result: reviews.length,
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.body._id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.body._id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
