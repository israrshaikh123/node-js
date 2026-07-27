const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User.js");

const register = async (req, res) => {
  try {
    const { name, email, password, role, mobileNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      mobileNumber
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!user) return res.status(401).json({ message: info.message || "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error", error: err.message });
      return res.status(200).json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error", error: err.message });
    res.status(200).json({ message: "Logged out successfully" });
  });
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { register, login, logout, changePassword };