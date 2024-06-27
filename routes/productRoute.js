const express = require("express");
const router = express.Router();

//Controller
const {
  getAllProducts,
  getProductByID,
} = require("../controllers/productController");

//ALL PRODUCTS || GET
router.get("/", getAllProducts);

//PRODUCT DETAILS BY ID || GET
router.get("/:productid", getProductByID);

module.exports = router;
