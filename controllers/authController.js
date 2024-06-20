const { errorResponse, successResponse } = require("../config/globalResponse");

//SignUp Controller
const signup = async (req, res) => {
  //Sending Response
  successResponse.success = true;
  successResponse.data = [];
  successResponse.message = "Signup Successful";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
};

//SignIn Controller
const signin = async (req, res) => {
  //Sending Response
  successResponse.success = true;
  successResponse.data = [];
  successResponse.message = "Signin Successful";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
};

//Signout Controller
const signout = async (req, res) => {
  //Sending Response
  successResponse.success = true;
  successResponse.data = [];
  successResponse.message = "Signout Successful";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res.status(200).json(successResponse);
};

module.exports = { signup, signin, signout };
