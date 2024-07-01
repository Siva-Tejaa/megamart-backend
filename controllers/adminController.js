const { successResponse, errorResponse } = require("../config/globalResponse");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

//Get All Customers Controller
const getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await User.find(
      {
        role: { $in: ["customer"] },
      },
      {
        hashedPassword: 0,
        sellerInfo: 0,
        sellerOrders: 0,
        wishList: 0,
        customerCart: 0,
      }
    ).exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};
    //Sending success response
    successResponse.success = true;
    successResponse.data.customers = allCustomers;
    successResponse.data.totalCustomers = allCustomers.length;
    successResponse.message = "All Customers fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

//Get Customer Orders by Customer ID
const getCustomerOrdersByCustomerId = async (req, res) => {
  try {
    // Find the seller by the provided seller ID
    const customer = await User.findById(req.params.customerId);

    // Check if the seller exists and has the role of 'seller'
    if (!customer || !customer.role.includes("customer")) {
      //send error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Customer not found or invalid customer ID";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";
      return res.status(404).json(errorResponse);
    }

    // Fetch products associated with the seller
    const customerOrders = await Order.find({
      customerId: req.params.customerId,
    })
      .populate({
        path: "products.productId", // Assuming your Order schema has products array with productId referencing Product model
        model: "Product", // Name of the model to populate
        select: "title productImage", // Optional: Specify fields to include or exclude
      })
      .sort({ createdAt: -1 })
      .exec();

    // If no products are found, respond accordingly
    if (customerOrders.length === 0) {
      successResponse.success = true;
      successResponse.data = [];
      successResponse.message = "No orders found for this customer";
      successResponse.statusCode = 200;
      successResponse.statusText = "OK";
      return res.status(200).json(successResponse);
    }

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending success response
    successResponse.success = true;
    successResponse.data.customerOrders = customerOrders;
    successResponse.data.totalCustomerOrders = customerOrders.length;
    successResponse.message = "Customer Orders fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Get All Sellers Controller
const getAllSellers = async (req, res) => {
  try {
    const allSellers = await User.find(
      {
        role: { $in: ["seller"] },
      },
      {
        hashedPassword: 0,
        wishList: 0,
        customerCart: 0,
        customerOrders: 0,
      }
    ).exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending success response
    successResponse.success = true;
    successResponse.data.sellers = allSellers;
    successResponse.data.totalSellers = allSellers.length;
    successResponse.message = "All Sellers fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

//Get Seller Products by Seller ID
const getSellerProductsBySellerId = async (req, res) => {
  try {
    // Find the seller by the provided seller ID
    const seller = await User.findById(req.params.sellerId);

    // Check if the seller exists and has the role of 'seller'
    if (!seller || !seller.role.includes("seller")) {
      //send error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Seller not found or invalid seller ID";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";
      return res.status(404).json(errorResponse);
    }

    // Fetch products associated with the seller
    const sellerProducts = await Product.find({
      sellerId: req.params.sellerId,
    }).sort({ createdAt: -1 });

    // If no products are found, respond accordingly
    if (sellerProducts.length === 0) {
      successResponse.success = true;
      successResponse.data = [];
      successResponse.message = "No products found for this seller";
      successResponse.statusCode = 200;
      successResponse.statusText = "OK";
      return res.status(200).json(successResponse);
    }

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending success response
    successResponse.success = true;
    successResponse.data.sellerProducts = sellerProducts;
    successResponse.data.totalSellerProducts = sellerProducts.length;
    successResponse.message = "Seller Products fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Get Seller Orders by Seller ID
const getSellerOrdersBySellerId = async (req, res) => {
  try {
    // Find the seller by the provided seller ID
    const seller = await User.findById(req.params.sellerId);

    // Check if the seller exists and has the role of 'seller'
    if (!seller || !seller.role.includes("seller")) {
      //send error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Seller not found or invalid seller ID";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";
      return res.status(404).json(errorResponse);
    }

    // Find all orders that contain products sold by the seller
    const sellerOrders = await Order.find({
      "products.sellerId": req.params.sellerId,
    })
      .populate({
        path: "products.productId", // Assuming your Order schema has products array with productId referencing Product model
        model: "Product", // Name of the model to populate
        select: "title productImage", // Optional: Specify fields to include or exclude
      })
      .sort({ createdAt: -1 })
      .exec();

    // If no products are found, respond accordingly
    if (sellerOrders.length === 0) {
      successResponse.success = true;
      successResponse.data = [];
      successResponse.message = "No orders found for this seller";
      successResponse.statusCode = 200;
      successResponse.statusText = "OK";
      return res.status(200).json(successResponse);
    }

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending success response
    successResponse.success = true;
    successResponse.data.sellerOrders = sellerOrders;
    successResponse.data.totalSellerOrders = sellerOrders.length;
    successResponse.message = "Seller Orders fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerOrdersByCustomerId,
  getAllSellers,
  getSellerProductsBySellerId,
  getSellerOrdersBySellerId,
};
