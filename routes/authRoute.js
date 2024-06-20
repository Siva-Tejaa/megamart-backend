const express = require("express");
const router = express.Router();

//Controllers
const { signup, signin, signout } = require("../controllers/authController");

//SIGNUP || POST
router.post("/signup", signup);

//SIGNIN || POST
router.post("/signin", signin);

//SIGNOUT || GET
router.get("/signout", signout);

module.exports = router;
