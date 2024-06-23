const JWT = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return JWT.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const generateRefreshToken = (user) => {
  return JWT.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Function to verify an access token
const verifyAccessToken = (token) => {
  return JWT.verify(token, process.env.JWT_ACCESS_SECRET);
};

// Function to verify a refresh token
const verifyRefreshToken = (token) => {
  return JWT.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
