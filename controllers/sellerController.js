const { successResponse, errorResponse } = require("../config/globalResponse");

const createProduct = async (req, res) => {
  //   console.log(req.user);
  res.send("Seller Can Post new Product");
};

const getSellerProducts = async (req, res) => {
  //   console.log(req.user);
  res.send("all seller products, Only Seller Can access this page");
};

module.exports = { createProduct, getSellerProducts };
