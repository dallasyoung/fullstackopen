const { mongoUrl } = require("./utils/config");

const express = require("express");
const app = express();

const cors = require("cors");
const blogsRoute = require("./controllers/blogs");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRoute);

const mongoose = require("mongoose");
mongoose
    .connect(mongoUrl)
    .then(console.log("Connected to MongoDB"));

module.exports = app;