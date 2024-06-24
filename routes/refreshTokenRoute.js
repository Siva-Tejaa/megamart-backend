const express = require("express");
const router = express.Router();

//Controller
const {
  refreshAccessTokenController,
} = require("../controllers/refreshTokenController");

router.post("/refresh-token", refreshAccessTokenController);

module.exports = router;
