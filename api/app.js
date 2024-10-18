const express = require("express");
const authRoutes = require("./Routes/Routes.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

module.exports = app;
