const express = require("express");
const bookingController = require("./../Controllers/bookingController");
const authController = require("./../Controllers/authController");

const router = express.Router({ mergeParams: true });


router.get('/checout-session/:tourId',authController.protect,bookingController.getCheckOutSession)
module.exports = router;
