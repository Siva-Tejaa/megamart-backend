const express = require("express");
const router = express.Router();

//Middlewares
const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

const {
  authenticateSeller,
} = require("../middlewares/authenticateSellerMiddleware");

//Controllers
const {
  createProduct,
  getSellerProducts,
} = require("../controllers/sellerController");

//POST PRODUCT  || POST
router.post("/products", authenticateUser, authenticateSeller, createProduct);

//GET SELLER OWN PRODUCTS  || GET
router.get(
  "/products",
  authenticateUser,
  authenticateSeller,
  getSellerProducts
);

module.exports = router;
