const { successResponse, errorResponse } = require("../config/globalResponse");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

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
      .sort({ createdAt: -1 })
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

//Customer Place Orders of Customer
const placeCustomerOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user cart to get customer cart products
    const user = await User.findById(userId);

    const products = user.customerCart;

    // Check if customerCart is empty
    if (user.customerCart.length === 0) {
      return res.status(400).json({
        success: false,
        error: [],
        message: "Cannot place order with an empty cart",
        statusCode: 400,
        statusText: "Bad Request",
      });
    }

    // Initialize totalAmount and orderProducts array
    let totalAmount = 0;
    const orderProducts = [];

    // Fetch product details and calculate total amount
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      totalAmount += product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
        sellerId: product.sellerId,
      });
    }

    // Create the order
    const order = new Order({
      customerId: userId,
      products: orderProducts,
      totalAmount,
    });

    await order.save();

    // Update customer's order history
    const updatedUser = await User.findById(userId);
    updatedUser.customerOrders.push(order._id);
    await updatedUser.save();

    // Update seller's order history
    for (const item of orderProducts) {
      const product = await Product.findById(item.productId);
      const seller = await User.findById(product.sellerId);
      if (seller) {
        seller.sellerOrders.push(order._id);
        await seller.save();
      }
    }

    // Empty customer's cart after placing order
    updatedUser.customerCart = [];
    await updatedUser.save();

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data.order = order;
    successResponse.data.totalOrderProducts = order.products.length;
    successResponse.message = "Order Placed successfully";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res.status(200).json(successResponse);
  } catch (error) {
    //Resetting the data/error Response
    successResponse.error = {};

    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 404;
    errorResponse.statusText = "Not Found";

    return res.status(404).json(errorResponse);
  }
};

//Get All Orders of Customer
const getAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const userOrders = await Order.find({ customerId: userId })
      .populate({
        path: "products.productId", // Assuming your Order schema has products array with productId referencing Product model
        model: "Product", // Name of the model to populate
        select: "title productImage", // Optional: Specify fields to include or exclude
      })
      .sort({ createdAt: -1 })
      .exec();

    //Resetting the data/error Response
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data = userOrders;
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
    const user = await User.findById(req.user._id)
      .populate("wishList")
      .sort({ createdAt: -1 })
      .exec();

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

    const updatedUser = await User.findById(req.user._id)
      .populate("wishList")
      .exec();

    //Resetting the data/error Response
    errorResponse.error = {};
    successResponse.data = {};

    //Sending Success Response
    successResponse.success = true;
    successResponse.data.wishListItems = updatedUser.wishList;
    successResponse.data.totalWishListItems = updatedUser.wishList.length;
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
  placeCustomerOrder,
  getAllOrders,
  getWishList,
  addOrRemoveWishListItem,
};
