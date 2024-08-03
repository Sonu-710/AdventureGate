const express = require("express");
const viewsController = require("./../Controllers/viewsController");

const router = express.Router();

router.get("/", viewsController.getOverview);
router.get("/tour", viewsController.getTour);

module.exports = router;
