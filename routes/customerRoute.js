const express = require("express");
const router = express.Router();

//Middleware
const {
  authenticateUser,
} = require("../middlewares/authenticateUserMiddleware");

const {
  addProductToCartMiddleware,
} = require("../middlewares/customerCartMiddleware");

//Controller
const {
  addItemToCart,
  decreaseItemQuantityFromCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  getAllCartItems,
  placeCustomerOrder,
  getAllOrders,
  getWishList,
  addOrRemoveWishListItem,
} = require("../controllers/customerController");

//ADD ITEM TO CART || POST
router.post(
  "/cart",
  authenticateUser,
  addProductToCartMiddleware,
  addItemToCart
);

//UPDATE ITEM QUANTITY FROM CART || PUT
router.put("/cart/:productId", authenticateUser, decreaseItemQuantityFromCart);

//REMOVE ITEM FROM CART || DELETE
router.delete("/cart/:productId", authenticateUser, removeItemFromCart);

//REMOVE ALL ITEMS FROM CART || DELETE
router.delete("/cart", authenticateUser, removeAllItemsFromCart);

//GET ALL CART ITEMS || GET
router.get("/cart", authenticateUser, getAllCartItems);

//POST ORDER || POST
router.post("/orders", authenticateUser, placeCustomerOrder);

//GET ALL ORDERS || GET
router.get("/orders", authenticateUser, getAllOrders);

//GET WISHLIST ITEMS || GET
router.get("/wishlist", authenticateUser, getWishList);

//ADD OR REMOVE PRODUCT TO WISHLIST ITEMS || GET
router.post("/wishlist", authenticateUser, addOrRemoveWishListItem);

module.exports = router;
