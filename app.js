const express = require("express");
const productRoute = require("./routes/productRoute");

const app = express();

app.use(express.json());
app.use("/products", productRoute);

module.exports = app;
