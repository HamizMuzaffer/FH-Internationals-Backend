import User from "../Models/usermodels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id, username, email, role) => {
  return jwt.sign({ id, username, email, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password, CNIC, contact, city } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { CNIC }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email is already in use" });
      }
      if (existingUser.CNIC === CNIC) {
        return res.status(400).json({ error: "CNIC is already in use" });
      }
    }

    const user = new User({
      username,
      email,
      password,
      CNIC,
      contact,
      city,
    });
    await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      CNIC: user.CNIC,
      contact: user.contact,
      city: user.city,
      role: user.role,
      token: generateToken(user._id, user.username, user.email, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.PASSWORD
    ) {
      return res.json({
        message: "Welcome Admin!",
        admin: true,
        token: generateToken("admin"),
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    res.json({
      message: "User login successful!",
      token: generateToken(user._id, user.username, user.email, user.role),
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        username: user.username,
        CNIC: user.CNIC,
        contact: user.contact,
        city: user.city,
        role: user.role,
      },
      admin: user.role === "admin",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
