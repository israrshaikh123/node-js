const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  otp: { type: Number, required: false },
  otpExpiry: { type: Date, required: false },
  role: {
    type: String,
    enum: ["superadmin", "admin", "manager", "employee"],
    default: "employee",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
