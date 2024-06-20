const successResponse = {
  success: true,
  data: {},
  message: "",
  statusCode: 200,
  statusText: "OK",
};

const errorResponse = {
  success: false,
  error: {},
  message: "",
  statusCode: 500,
  statusText: "Internal Server Error",
};

module.exports = { successResponse, errorResponse };
