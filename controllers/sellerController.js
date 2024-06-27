const { successResponse, errorResponse } = require("../config/globalResponse");

const User = require("../models/userModel");
const Product = require("../models/productModel");

//Create Product Controller
const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, stock, productImage } =
      req.body;

    const productDetails = {
      sellerId: req.user._id,
      title,
      description,
      category,
      price,
      stock,
      productImage,
    };

    // Create the product
    const product = await Product.create(productDetails);

    // Update the seller's products array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { "sellerInfo.products": product._id },
    });

    //Sending Response
    successResponse.success = true;
    successResponse.data = product;
    successResponse.message = "Product created successfully";
    successResponse.statusCode = 201;
    successResponse.statusText = "Created";

    return res.status(201).json(successResponse);
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

//Get Seller Products Controller
const getSellerProducts = async (req, res) => {
  try {
    const sellerProducts = await User.findById(req.user._id)
      .populate("sellerInfo.products")
      .exec();

    //Sending Response
    successResponse.success = true;
    successResponse.data = sellerProducts.sellerInfo.products;
    successResponse.message = "All Seller Products fetched successfully";
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

module.exports = { createProduct, getSellerProducts };
