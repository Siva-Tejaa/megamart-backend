const { errorResponse } = require("../config/globalResponse");

const signinMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Email is required.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!password || password.length < 6) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Password is required";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  next();
};

module.exports = { signinMiddleware };
