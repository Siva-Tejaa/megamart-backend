const express = require("express");
const router = express.Router();

//Middleware
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const { signinMiddleware } = require("../middlewares/signinMiddleware");
const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

//Controllers
const { signup, signin, signout } = require("../controllers/authController");

//SIGNUP || POST
router.post("/signup", signupMiddleware, signup);

//SIGNIN || POST
router.post("/signin", signinMiddleware, signin);

//SIGNOUT || POST
router.post("/signout", authenticateUser, signout);

module.exports = router;
