import express from "express";
import authRoutes from "./Routes/Routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello from server");
});

export default app;
