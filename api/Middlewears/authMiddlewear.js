import jwt from "jsonwebtoken";
import User from "../Models/usermodels.js";

// Middleware to protect routes and verify JWT token
export const protect = async (req, res, next) => {
  // Skip middleware for /favicon.ico requests
  if (req.path === "/favicon.ico") {
    return res.status(204).end(); // Respond with 'No Content' and move on
  }

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      if (decoded.id === "admin") {
        req.user = { username: "admin" };
        return next();
      }

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user);

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
