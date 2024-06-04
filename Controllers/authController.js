const User = require("./../Models/users");
const catchAsync = require("./../utils/CatchAsync.js");
const AppError = require("./../utils/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
