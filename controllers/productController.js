const { successResponse, errorResponse } = require("../config/globalResponse");
const Product = require("../models/productModel");

//Get All Products Controller
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Response
    successResponse.success = true;
    successResponse.data.products = allProducts;
    successResponse.data.totalProducts = allProducts.length;
    successResponse.message = "All products fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

//Get Product Details By ID Controller
const getProductByID = async (req, res) => {
  try {
    const productByID = await Product.findById(req.params.productid);

    if (!productByID) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = `Product with ID ${req.params.productid} not found`;
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";

      return res.status(404).json(errorResponse);
    }

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = productByID;
    successResponse.message = "Product details fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

module.exports = { getAllProducts, getProductByID };
