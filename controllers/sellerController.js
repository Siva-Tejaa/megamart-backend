const { successResponse, errorResponse } = require("../config/globalResponse");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

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
      .sort({ createdAt: -1 })
      .exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Response
    successResponse.success = true;
    successResponse.data.products = sellerProducts.sellerInfo.products;
    successResponse.data.totalProducts =
      sellerProducts.sellerInfo.products.length;
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

//Get Seller Orders
const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Find all orders that contain products sold by the seller
    const sellerOrders = await Order.find({
      "products.sellerId": sellerId,
    })
      .populate({
        path: "products.productId", // Assuming your Order schema has products array with productId referencing Product model
        model: "Product", // Name of the model to populate
        select: "title productImage", // Optional: Specify fields to include or exclude
      })
      .sort({ createdAt: -1 })
      .exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Response
    successResponse.success = true;
    successResponse.data.sellerOrders = sellerOrders;
    successResponse.data.totalSellerOrders = sellerOrders.length;
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

module.exports = { createProduct, getSellerProducts, getSellerOrders };
