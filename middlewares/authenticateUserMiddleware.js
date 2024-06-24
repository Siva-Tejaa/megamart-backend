const { errorResponse } = require("../config/globalResponse");
const { verifyAccessToken } = require("../utils/jwtUtils");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    // Resetting errorResponse.data before setting new data
    errorResponse.error = {};

    //Error Response
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Access token not found";
    errorResponse.statusCode = 401;
    errorResponse.statusText = "Unauthorized";

    return res.status(401).send(errorResponse);
  }

  const userJwtToken = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(userJwtToken);
    req.user = payload;
    next();
  } catch (error) {
    // Resetting errorResponse.data before setting new data
    errorResponse.error = {};

    //Error Response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Invalid Access Token";
    errorResponse.statusCode = 403;
    errorResponse.statusText = "Forbidden";

    return res.status(403).send(errorResponse);
  }
};

module.exports = { authenticateUser };
