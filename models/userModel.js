const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: [true, "LastName is required"],
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: [true, "Mobile Number is required"],
      trim: true,
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    role: {
      type: Array,
      default: ["customer"],
    },
    profileImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    ],
    sellerInfo: {
      storeName: { type: String },
      storeDescription: { type: String },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    customerCart: [
      {
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    customerOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    sellerOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

//The pre('save') mongoose middleware is triggered before saving the document to DB
userSchema.pre("save", function (next) {
  const firstInitial = this.firstName.charAt(0).toLowerCase();
  const lastInitial = this.lastName.charAt(0).toLowerCase();
  this.profileImage = `https://cdn.auth0.com/avatars/${firstInitial}${lastInitial}.png`;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
