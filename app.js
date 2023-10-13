const express = require("express");
const app = express();
const port = process.env.port || 8080;
const mongoose = require("mongoose");
const connectDB = require("./dbConn/connect");
require("dotenv").config();

//Connect to DB
connectDB();

app
  .use(express.json())
  .use("/", require("./routes"))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  });

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
