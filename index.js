require("dotenv").config();
const express = require("express");
const app = express();

const cronjob = require("./cronjob");

//Database Imports
const connectDB = require("./config/dbConfig");

//Third Party Libraries
const cors = require("cors");
var cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

//IP Limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

//Routes Imports
const authRoute = require("./routes/authRoute");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");
const sellerRoute = require("./routes/sellerRoute");
const adminRoute = require("./routes/adminRoute");
const notFoundRoute = require("./routes/notFoundRoute");

//cron Job Configuration for Production Alive
const heartBeatRoute = require("./routes/heartBeatRoute");

//----- Middlewares -----
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);

//----- Routes -----
//Auth Route
app.use("/api/auth", authRoute);

//Refresh Token Route
app.use("/api/refresh-token", refreshTokenRoute);

//Product Route
app.use("/api/products", productRoute);

//User Route
app.use("/api/users/me", userRoute);

//Customer Route
app.use("/api/customers/me", customerRoute);

//Seller Route
app.use("/api/sellers/me", sellerRoute);

//Admin Route
app.use("/api/admin", adminRoute);

//HeartBeat Route for making Production Render Service Alive
app.use("/api", heartBeatRoute);

// Use the not found route as the last route
// app.use("*", notFoundRoute); or
app.use(notFoundRoute); //Recommended

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
