const jwt = require("jsonwebtoken");
const User = require("../Models/usermodels");

exports.protect = async (req, res, next) => {
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
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};