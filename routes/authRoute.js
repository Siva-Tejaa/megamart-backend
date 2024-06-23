const express = require("express");
const router = express.Router();

//Middleware
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const { signinMiddleware } = require("../middlewares/signinMiddleware");

//Controllers
const { signup, signin, signout } = require("../controllers/authController");

//SIGNUP || POST
router.post("/signup", signupMiddleware, signup);

//SIGNIN || POST
router.post("/signin", signinMiddleware, signin);

//SIGNOUT || GET
router.get("/signout", signout);

module.exports = router;
