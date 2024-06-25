const { successResponse, errorResponse } = require("../config/globalResponse");
const {
  generateAccessToken,
  verifyRefreshToken,
} = require("../utils/jwtUtils");

const refreshAccessTokenController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Refresh Token Not Found";
    errorResponse.statusCode = 401;
    errorResponse.statusText = "Unauthorized";
    return res.status(401).json(errorResponse);
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(payload);

    // Resetting successResponse.data before setting new data
    successResponse.data = {};

    //success Response
    successResponse.success = true;
    successResponse.data.accessToken = newAccessToken;
    successResponse.message = "New Access Token Generated Successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    // Resetting errorResponse.data before setting new data
    errorResponse.error = {};

    //Error Response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Invalid refresh token.";
    errorResponse.statusCode = 403;
    errorResponse.statusText = "Forbidden";

    return res.status(403).send(errorResponse);
  }
};

module.exports = { refreshAccessTokenController };
