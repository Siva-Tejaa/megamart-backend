const { successResponse, errorResponse } = require("../config/globalResponse");

const getUserProfile = (req, res) => {
  //Success Response
  successResponse.success = true;
  successResponse.data = req.user;
  successResponse.message = "User Profile protected";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
};

const updateUserProfile = (req, res) => {
  //Success Response
  successResponse.success = true;
  successResponse.data = req.user;
  successResponse.message = "User Profile Updated protected";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
};

module.exports = { getUserProfile, updateUserProfile };
