const Tour = require("./../Models/tours.js");

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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
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
