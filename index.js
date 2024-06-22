require("dotenv").config();
const express = require("express");
const app = express();

//Database Imports
const connectDB = require("./config/dbConfig");

const cors = require("cors");

//Routes Imports
const authRoute = require("./routes/authRoute");

const notFoundRoute = require("./routes/notFoundRoute");

//Middlewares
app.use(express.json());
app.use(cors());

//Routes

//Auth Route
app.use("/api/auth", authRoute);

// Use the not found route as the last route
// app.use("*", notFoundRoute); or
app.use(notFoundRoute); //Recommended

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
