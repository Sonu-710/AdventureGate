const Tour = require("./../Models/tours.js");
const catchAsync = require("./../utils/CatchAsync.js");
const AppError = require("./../utils/AppError");
const factory = require("./handlerFactory");
const razoypay = require("razorpay");

exports.getCheckOutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  //CREATE CHECKOUT SESSION
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  instance.orders.create({
    amount: tour.price,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
});
