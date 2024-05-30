exports.getAllTours = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.getTour = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.createTour = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.updateTour = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.deleteTour = (req, res) => {
  res.status(500).json({
    message: "This Route is not yet implemented",
  });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      message: "Invalid Data",
    });
  next();
};
