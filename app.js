const express = require("express");
const app = express();
const port = process.env.port || 8080;
const mongoose = require("mongoose");
const connectDB = require("./dbConn/connect");
const bodyParser = require("body-parser");
require("dotenv").config();

//Connect to DB
connectDB();

app
  .use("/", require("./routes"))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  });

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
