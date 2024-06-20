const express = require("express");
const router = express.Router();

const { errorResponse } = require("../config/globalResponse");

router.use("/", (req, res) => {
  //Custom Error Response for Page Not Found Router
  errorResponse.success = false;
  errorResponse.error = [];
  errorResponse.message =
    "The requested resource was not found on this server.";
  errorResponse.statusCode = 404;
  errorResponse.statusText = "Not Found";

  return res.status(404).json(errorResponse);
});

module.exports = router;
