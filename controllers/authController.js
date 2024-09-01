const { errorResponse, successResponse } = require("../config/globalResponse");

//Util functions
const { hashPassword, comparePassword } = require("../utils/passwordUtil");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");

//Models
const User = require("../models/userModel");

//EMAIL SERVICE
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY);

//SignUp Controller
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;

    //Find the User if already exists in the database based on email and mobileNumber
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });

    if (existingUser) {
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message =
        "User with this email or mobile number already exists";
      errorResponse.statusCode = 409;
      errorResponse.statusText = "Conflict";

      return res.status(409).json(errorResponse);
    }

    //Hashing the Password using utility function
    const hashedPassword = await hashPassword(password);

    //Saving the Signup user data into Database
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      hashedPassword: hashedPassword,
    });

    const limitedData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    //Email Service msg formation
    const msg = {
      to: user.email, // Change to your recipient
      from: "asivateja1999@gmail.com", // Change to your verified sender
      subject: "Welcome to MegaMart!",
      // text: `Hi ${user.firstName}, welcome to MegaMart`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h3>Welcome to MegaMart, ${firstName} ${lastName}!</h3>
        <p>Hi ${firstName},</p>
        <p>Thank you for signing up at MegaMart. We're thrilled to have you with us.</p>
        <p>As a new member, you can start exploring our wide range of products and enjoy exclusive deals right away.</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Happy shopping!</p>
        <p>Best regards,</p>
        <p>The MegaMart Team</p>
      </div>
    `,
    };

    try {
      await sgMail.send(msg);
      //Email Sent Successfully
    } catch (error) {
      //Error Encountered while sending email
    }

    //Sending Response
    successResponse.success = true;
    successResponse.data = limitedData;
    successResponse.message = "Signup Successful";
    successResponse.statusCode = 201;
    successResponse.statusText = "Created";

    return res.status(201).json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

//SignIn Controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find the User if exists in the database based on email
    const isUserExist = await User.findOne({
      email,
    });

    if (!isUserExist) {
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "User with this email doesn't exist";
      errorResponse.statusCode = 404;
      errorResponse.statusText = "NotFound";

      return res.status(404).json(errorResponse);
    }

    // Compare UserPassword & Hashed Password from DB using the utility function
    const isPasswordMatched = await comparePassword(
      password,
      isUserExist.hashedPassword
    );

    if (!isPasswordMatched) {
      errorResponse.success = false;
      errorResponse.error = [];
      errorResponse.message = "Invalid password";
      errorResponse.statusCode = 401;
      errorResponse.statusText = "Unauthorized";

      return res.status(401).json(errorResponse);
    }

    //JWT Token Creation for Access Token & Refresh Token
    const accessToken = generateAccessToken(isUserExist);

    const refreshToken = generateRefreshToken(isUserExist);

    const limitedResponse = {
      _id: isUserExist._id,
      firstName: isUserExist.firstName,
      lastName: isUserExist.lastName,
      email: isUserExist.email,
      role: isUserExist.role,
      accessToken: accessToken,
    };

    //Sending Response
    successResponse.success = true;
    successResponse.data = limitedResponse;
    successResponse.message = "Signin Successful";
    successResponse.statusCode = 200;
    successResponse.statusText = "OK";

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None", // Use 'None' for cross-origin requests
        secure: true, // Ensure the request is over HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/", // Make the cookie available across the entire domain /about /contact
      })
      .status(200)
      .json(successResponse);
  } catch (error) {
    //Sending error response
    errorResponse.success = false;
    errorResponse.error = error;
    errorResponse.message = "Something went wrong";
    errorResponse.statusCode = 500;
    errorResponse.statusText = "Internal server error";

    return res.status(500).json(errorResponse);
  }
};

//Signout Controller
const signout = async (req, res) => {
  //Sending Response
  successResponse.success = true;
  successResponse.data = [];
  successResponse.message = "Signout Successful";
  successResponse.statusCode = 200;
  successResponse.statusText = "OK";

  return res
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json(successResponse);
};

module.exports = { signup, signin, signout };
