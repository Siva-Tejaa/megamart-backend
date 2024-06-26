const express = require("express");
const router = express.Router();

//Middlewares
const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

const {
  createProductMiddleware,
} = require("../middlewares/createProductMiddleware");

const {
  authenticateSeller,
} = require("../middlewares/authenticateSellerMiddleware");

//Controllers
const {
  createProduct,
  getSellerProducts,
  getSellerOrders,
} = require("../controllers/sellerController");

//POST PRODUCT  || POST
router.post(
  "/products",
  authenticateUser,
  authenticateSeller,
  createProductMiddleware,
  createProduct
);

//GET SELLER OWN PRODUCTS  || GET
router.get(
  "/products",
  authenticateUser,
  authenticateSeller,
  getSellerProducts
);

//GET SELLERS ORDERS || GET
router.get("/orders", authenticateUser, authenticateSeller, getSellerOrders);

module.exports = router;
