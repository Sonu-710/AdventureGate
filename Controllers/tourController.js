const Tour = require("./../Models/tours.js");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tour: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tour: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: err,
    });
  }
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
