const { errorResponse } = require("../config/globalResponse");

const signupMiddleware = (req, res, next) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body;

  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName || firstName.length < 3 || firstName.length > 10) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "First name is required and must be between 3 and 10 characters.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!lastName || lastName.length < 3 || lastName.length > 10) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "Last name is required and must be between 3 and 10 characters.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!email || !emailRegex.test(email)) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "A valid email is required.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (
    !mobileNumber ||
    String(mobileNumber).length !== 10 ||
    typeof mobileNumber !== "number"
  ) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "Mobile Number is required and must be exactly 10 digits.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!password || password.length < 6) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "Password is required and must be at least 6 characters.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  next();
};

module.exports = { signupMiddleware };
