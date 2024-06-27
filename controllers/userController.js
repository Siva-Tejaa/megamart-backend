const { successResponse, errorResponse } = require("../config/globalResponse");
const User = require("../models/userModel");

//Get User Details Controller
const getUserProfile = async (req, res) => {
  try {
    const { _id, email, role } = req.user;

    const userDetails = await User.findById(_id);

    const limitedResponse = {
      _id: userDetails._id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      mobileNumber: userDetails.mobileNumber,
      role: userDetails.role,
      isEmailVerified: userDetails.isEmailVerified,
      isMobileVerified: userDetails.isMobileVerified,
      profileImage: userDetails.profileImage,
      createdAt: userDetails.createdAt,
      updatedAt: userDetails.updatedAt,
    };

    //Success Response
    successResponse.success = true;
    successResponse.data = limitedResponse;
    successResponse.message = "User Profile Details";
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

//Update User Profile Controller
const updateUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;

    const { firstName, lastName } = req.body;

    // Fetch the user document
    const user = await User.findById(_id);

    // Update the fields if they are provided
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    // Save the document to trigger the pre('save') middleware for updating image also
    await user.save();

    const limitedResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isMobileVerified: user.isMobileVerified,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    //Success Response
    successResponse.success = true;
    successResponse.data = limitedResponse;
    successResponse.message = "User Profile Updated Successfully";
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

module.exports = { getUserProfile, updateUserProfile };
