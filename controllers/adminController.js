const { successResponse, errorResponse } = require("../config/globalResponse");
const User = require("../models/userModel");

const getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await User.find(
      {
        role: { $in: ["customer"] },
      },
      "-hashedPassword"
    ).exec();

    //Sending success response
    successResponse.success = true;
    successResponse.data = allCustomers;
    successResponse.message = "All Customers fetched successfully";
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

const getAllSellers = async (req, res) => {
  try {
    const allSellers = await User.find(
      {
        role: { $in: ["seller"] },
      },
      "-hashedPassword"
    ).exec();

    //Sending success response
    successResponse.success = true;
    successResponse.data = allSellers;
    successResponse.message = "All Sellers fetched successfully";
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

module.exports = { getAllCustomers, getAllSellers };
