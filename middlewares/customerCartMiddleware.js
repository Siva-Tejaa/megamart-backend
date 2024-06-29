const { errorResponse } = require("../config/globalResponse");

const addProductToCartMiddleware = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    //Custom ErrorResponse
    errorResponse.success = false;
    errorResponse.error = [];
    errorResponse.message = "Invalid product ID or quantity.";
    errorResponse.statusCode = 400;
    errorResponse.statusText = "Bad Request";

    return res.status(400).json(errorResponse);
  }

  next();
};

module.exports = { addProductToCartMiddleware };
