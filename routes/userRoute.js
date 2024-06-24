const express = require("express");
const router = express.Router();

const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

//USER PROFILE DETAILS || GET
router.get("/", authenticateUser, getUserProfile);

//UPDATE USER PROFILE || PUT
router.put("/", authenticateUser, updateUserProfile);

module.exports = router;
