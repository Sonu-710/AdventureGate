const { promisify } = require("util");
const User = require("./../Models/users");
const catchAsync = require("./../utils/CatchAsync.js");
const AppError = require("./../utils/AppError");
const sendEmail = require("./../utils/email");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser.id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Invalid email or password"), 401);
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("The user no longer exists", 401));

  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password.Please login again", 401)
    );

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new Error("You don't have access to perfrom this action", 403)
      );
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("No user with the email", 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request to :${resetURL}`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password Reset Token (Valid for 10min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!!",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return next(
      new AppError("There was an error sending the email.Try again later!"),
      500
    );
  }
});
exports.resetPassword = (req, res, next) => {};
//To-do
//Test the password changed Property
