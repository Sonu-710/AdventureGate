const Review = require("./../Models/reviewModel");
const catchAsync = require("./../utils/CatchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);
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
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      newReview,
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
