const { errorResponse } = require("../config/globalResponse");

const createProductMiddleware = (req, res, next) => {
  const { title, description, category, price, stock, productImage } = req.body;

  if (!title || title.length < 4 || title.length > 50) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "Title is required and must be between 4 and 50 characters.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!description || description.length < 10 || description.length > 500) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message =
      "Description is required and must be between 10 and 500 characters.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!category) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Category is required";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!price || price <= 0) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Price is required and cannot be zero or negative";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!stock || stock < 0) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Stock is required and cannot be negative";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  if (!productImage) {
    //Custom Error Response for Page Not Found Router
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Product Image required";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  next();
};

module.exports = { createProductMiddleware };
