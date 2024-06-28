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
  getCustomerOrdersByCustomerId,
  getAllSellers,
  getSellerProductsBySellerId,
  getSellerOrdersBySellerId,
} = require("../controllers/adminController");

//All USERS LIST || GET
router.get("/customers", authenticateUser, authenticateAdmin, getAllCustomers);

//GET CUSTOMER ORDERS BY CUSTOMER ID || GET
router.get(
  "/customer/:customerId/orders",
  authenticateUser,
  authenticateAdmin,
  getCustomerOrdersByCustomerId
);

//ALL SELLERS LIST || GET
router.get("/sellers", authenticateUser, authenticateAdmin, getAllSellers);

//GET SELLER OWN PRODUCTS BY SELLER ID || GET
router.get(
  "/seller/:sellerId/products",
  authenticateUser,
  authenticateAdmin,
  getSellerProductsBySellerId
);

//GET SELLER ORDERS BY SELLER ID || GET
router.get(
  "/seller/:sellerId/orders",
  authenticateUser,
  authenticateAdmin,
  getSellerOrdersBySellerId
);

//....More Routes to Add

module.exports = router;
