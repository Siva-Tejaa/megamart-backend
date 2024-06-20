require("dotenv").config();

const express = require("express");
const app = express();

//Database Imports
const connectDB = require("./config/dbConfig");

const cors = require("cors");

//Routes Imports
const authRoute = require("./routes/authRoute");

//Middlewares
app.use(express.json());
app.use(cors());

//Routes

//Auth Route
app.use("/api/auth", authRoute);

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
