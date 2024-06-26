const { errorResponse } = require("../config/globalResponse");

const authenticateAdmin = async (req, res, next) => {
  try {
    if (req.user.role.includes("admin")) {
      return next();
    }

    // Resetting errorResponse.data before setting new data
    errorResponse.error = {};

    //Error Response
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "User is not authorized to access this page";
    errorResponse.statusCode = 403;
    errorResponse.statusText = "Forbidden";

    return res.status(403).send(errorResponse);
  } catch (error) {
    // Resetting errorResponse.data before setting new data
    errorResponse.error = {};

    //Error Response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "An unexpected error occurred";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal Server Error";

    return res.status(403).send(errorResponse);
  }
};

module.exports = { authenticateAdmin };
