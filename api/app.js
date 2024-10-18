const express = require("express");
const authRoutes = require("./Routes/Routes.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

module.exports = app;
