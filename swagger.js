const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Star Wars API",
    description: "API for CSE-341 project 2",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
