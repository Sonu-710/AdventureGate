const Tour = require("./../Models/tours.js");
const catchAsync = require("./../utils/CatchAsync.js");
const AppError = require("./../utils/AppError");
const factory = require("./handlerFactory");

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  //CREATE CHECKOUT SESSION

});
