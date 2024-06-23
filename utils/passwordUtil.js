const bcrypt = require("bcrypt");

// Function to hash a password
const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

// Function to compare a plain text password with a hashed password
const comparePassword = (normalPassword, hashedPassword) => {
  return bcrypt.compare(normalPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
