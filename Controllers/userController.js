const User = require("./../Models/users");
const catchAsync = require("./../utils/CatchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      tour: users,
    },
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

exports.deleteUser = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};
