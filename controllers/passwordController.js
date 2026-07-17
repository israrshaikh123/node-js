const User = require("../models/User.js");
const transporter = require("../config/mailer.js");
const bcrypt = require("bcrypt");

const passwordController = {
  forgotPassword: (req, res) => {
    res.render("forgotPassword");
  },

  forgotPasswordSubmit: async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      req.flash("error", "No account found with this email");
      return res.redirect("/forgotPassword");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    req.flash("success", "OTP sent to your email");
    res.redirect(`/verifyOtp?email=${user.email}`);
  },
  verifyOtp: (req, res) => {
    const email = req.query.email;
    res.render("verifyOtp", { email: email });
  },

  verifyOtpSubmit: async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });

    console.log(
      "OTP Expiry:",
      user ? user.otpExpiry : "-",
      "Current time:",
      Date.now(),
    );

    if (!user || user.otp != otp) {
      req.flash("error", "Invalid OTP");
      return res.redirect(`/verifyOtp?email=${email}`);
    }

    if (Date.now() > user.otpExpiry) {
      req.flash("error", "OTP expired, please try again");
      return res.redirect("/forgotPassword");
    }

    res.redirect(`/resetPassword?email=${email}`);
  },

  resetPassword: (req, res) => {
    const email = req.query.email;
    res.render("resetPassword", { email: email });
  },

  resetPasswordSubmit: async (req, res) => {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (newPassword != confirmNewPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect(`/resetPassword?email=${email}`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword, otp: null, otpExpiry: null },
    );

    req.flash("success", "Password reset successful, please login");
    res.redirect("/login");
  },
};

module.exports = passwordController;
