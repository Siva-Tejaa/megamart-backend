const { successResponse, errorResponse } = require("../config/globalResponse");

const User = require("../models/userModel");
const Product = require("../models/productModel");

//Add Product Item to Cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate the quantity
    if (quantity <= 0) {
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Quantity must be greater than zero";
      errorResponse.statusCode = 400;
      errorResponse.statusText = "Bad Request";
      return res.status(400).json(errorResponse);
    }

    const product = await Product.findById(productId);

    //Check if product exists
    if (!product) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = `Product with ID ${productId} not found`;
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";

      return res.status(200).json(errorResponse);
    }

    // Check if the product is out of stock
    if (product.stock < quantity) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Product is out of stock";
      errorResponse.statusCode = 400;
      errorResponse.statusText = "Bad Request";

      return res.status(200).json(errorResponse);
    }

    // Get the user and check if the product is already in the cart
    const user = await User.findById(req.user._id);

    const existingCartItem = user.customerCart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      existingCartItem.quantity += quantity;
    } else {
      // Add the new product to the cart
      user.customerCart.push({ productId, quantity });
    }

    // Save the updated user
    await user.save();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = user.customerCart;
    successResponse.message = "Product added to cart successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Decrease Product Quantity from Cart
const decreaseItemQuantityFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Get the user and check if the product is already in the cart
    const user = await User.findById(req.user._id);

    const existingCartItem = user.customerCart.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingCartItem) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Product does not exist in the cart";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";

      return res.status(404).json(errorResponse);
    }

    //Check if the quantity equals to 1, then remove it from the cart
    if (existingCartItem.quantity === 1) {
      //Get the user and remove the product from the cart
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { customerCart: { productId } },
        },
        { new: true }
      );

      //Resetting the data/error Response
      successResponse.data = {};

      //Sending Success Response
      successResponse.success = true;
      successResponse.data = updatedUser.customerCart;
      successResponse.message =
        "Product Quantity in Cart decreased successfully";
      successResponse.statusCode = 200;
      successResponse.statusText = "OK";

      return res.status(200).json(successResponse);
    }

    // Decrease the quantity of the existing cart item if quantity > 1
    existingCartItem.quantity = existingCartItem.quantity - 1;

    const updatedUser = await user.save();

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = updatedUser.customerCart;
    successResponse.message = "Product Quantity in Cart decreased successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Remove Product from Cart
const removeItemFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Get the user and check if the product is already in the cart
    const user = await User.findById(req.user._id);

    const existingCartItem = user.customerCart.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingCartItem) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Product does not exist in the cart";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";

      return res.status(404).json(errorResponse);
    }

    //Get the user and remove the product from the cart
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { customerCart: { productId } },
      },
      { new: true }
    );

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = updatedUser.customerCart;
    successResponse.message = "Product removed from cart successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Remove All Product Items from Cart
const removeAllItemsFromCart = async (req, res) => {
  try {
    // Get the user and empty the cart
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { customerCart: [] },
      },
      { new: true }
    );

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = updatedUser.customerCart;
    successResponse.message = "All Products removed from cart successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Get All Cart Items
const getAllCartItems = async (req, res) => {
  try {
    // Get the user's cart items
    const user = await User.findById(req.user._id)
      .populate({
        path: "customerCart.productId",
        model: "Product",
      })
      .exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data.cartItems = user.customerCart;
    successResponse.data.totalCartItems = user.customerCart.length;
    successResponse.message = "All Cart Items fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//TODO : Place Orders of Customer
const placeOrder = async (req, res) => {
  try {
    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = [];
    successResponse.message = "Products Ordered successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//TODO : Get All Orders of Customer
const getAllOrders = async (req, res) => {
  try {
    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = [];
    successResponse.message = "All Orders fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Get All Wishlist Products of Customer
const getWishList = async (req, res) => {
  try {
    // Get the user's wishlist items with populated product details
    const user = await User.findById(req.user._id).populate("wishList").exec();

    if (!user) {
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "User not found";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";
      return res.status(404).json(errorResponse);
    }

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data.wishListItems = user.wishList;
    successResponse.data.totalWishListItems = user.wishList.length;
    successResponse.message = "Wishlist Items fetched successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Add or Remove Product from Wishlist of Customer
const addOrRemoveWishListItem = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    //Check if product exists
    if (!product) {
      //Sending error response
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = `Product with ID ${productId} not found`;
      errorResponse.statusCode = 404;
      errorResponse.statusText = "Not Found";

      return res.status(200).json(errorResponse);
    }

    // Get the user
    const user = await User.findById(req.user._id);

    // Check if the product is already in the user wishlist
    const existingWishListItem = user.wishList.includes(productId);

    if (existingWishListItem) {
      // Remove the product from the wishlist
      user.wishList = user.wishList.filter(
        (item) => item.toString() !== productId
      );
      successResponse.message = "Product removed from wishlist successfully";
    } else {
      // Add the product to the wishlist
      user.wishList.push(productId);
      successResponse.message = "Product added to wishlist successfully";
    }

    // Save the updated user
    await user.save();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = user.wishList;
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = [];
    successResponse.message = "Product added to wishlist successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

module.exports = {
  addItemToCart,
  decreaseItemQuantityFromCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  getAllCartItems,
  placeOrder,
  getAllOrders,
  getWishList,
  addOrRemoveWishListItem,
};
