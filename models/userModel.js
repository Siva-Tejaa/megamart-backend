const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName is required"],
      trim: true,
      minlength: 3,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: [true, "LastName is required"],
      trim: true,
      minlength: 3,
      maxlength: 10,
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
