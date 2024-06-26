const express = require("express");
const router = express.Router();

//Middlewares
const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

const {
  authenticateAdmin,
} = require("../middlewares/authenticateAdminMiddleware");

//Controllers
const {
  getAllCustomers,
  getAllSellers,
} = require("../controllers/adminController");

//All USERS LIST || GET
router.get("/customers", authenticateUser, authenticateAdmin, getAllCustomers);

//ALL SELLERS LIST || GET
router.get("/sellers", authenticateUser, authenticateAdmin, getAllSellers);

//....More Routes to Add

module.exports = router;
