const express = require("express");
const router = express.Router();

const { successResponse } = require("../config/globalResponse");

// Heartbeat route
router.get("/heartbeat", (req, res) => {
  //Sending Success Response
  successResponse.success = true;
  successResponse.data = [];
  successResponse.message = "Server in production is up and running...";
  successResponse.status = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
});

module.exports = router;
