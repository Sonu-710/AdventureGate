const User = require("./../Models/users");
const catchAsync = require("./../utils/CatchAsync");
const AppError = require("./../utils/AppError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users: users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("This route is not to update password", 201));

  const filteredBody = filterObj(req.body, "name", "email");
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  console.log(user);
  if (!user) {
    return next(new AppError("Something wrong"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
