require("dotenv").config();
const express = require("express");
const app = express();

//Database Imports
const connectDB = require("./config/dbConfig");

const cors = require("cors");
var cookieParser = require("cookie-parser");

//Routes Imports
const authRoute = require("./routes/authRoute");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const userRoute = require("./routes/userRoute");
const sellerRoute = require("./routes/sellerRoute");
const adminRoute = require("./routes/adminRoute");
const notFoundRoute = require("./routes/notFoundRoute");

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//----- Routes -----

//Auth Route
app.use("/api/auth", authRoute);

//Refresh Token Route
app.use("/api", refreshTokenRoute);

//User Route
app.use("/api/users/me", userRoute);

//Seller Route
app.use("/api/seller", sellerRoute);

//Admin Route
app.use("/api/admin", adminRoute);

// Use the not found route as the last route
// app.use("*", notFoundRoute); or
app.use(notFoundRoute); //Recommended

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
