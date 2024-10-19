import jwt from "jsonwebtoken";
import User from "../Models/usermodels.js";

// Middleware to protect routes and verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token from the Bearer token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log("Decoded token:", decoded);

      // Check if the decoded token is for admin
      if (decoded.id === "admin") {
        req.user = { username: "admin" };
        return next();
      }

      // Find the user from the database excluding the password
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User found:", req.user);

      next(); // Proceed to the next middleware
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is provided
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
