const express = require("express");
const router = express.Router();

//Controller
const {
  refreshAccessTokenController,
} = require("../controllers/refreshTokenController");

router.post("/", refreshAccessTokenController);

module.exports = router;
