const mongoose = require("mongoose");

const { allCategories } = require("../config/categories");

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "SellerId is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 4,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 30,
      maxlength: 500,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: allCategories,
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      min: [1, "Price cannot be zero or negative"],
    },
    stock: {
      type: Number,
      required: [true, "Product Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    productImage: {
      type: String,
      required: [true, "Product Image required"],
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount percentage cannot be negative"],
      max: [100, "Discount percentage cannot be more than 100"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot be more than 5"],
    },
    totalRatings: {
      type: Number,
      default: 0,
      min: [0, "Total Ratings cannot be negative"],
    },
    reviews: {
      type: Array,
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
