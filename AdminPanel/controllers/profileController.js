const User =  require('../models/User')
const bcrypt = require('bcrypt')

const profileController = {
  viewProfile: (req, res) => {
    res.render("profile", { user: req.user });
  },

  changePassword: (req, res) => {
    res.render("changePassword");
  },

  changePasswordSubmit: async (req, res) => {
    const id = req.user._id;

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;

    if (newPassword != confirmNewPassword) {
      req.flash("error", "New Password And Confirmed Password Are Not Same");
      res.redirect("/changePassword");
      return;
    }

    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      req.user.password,
    );

    if (!isMatch) {
      req.flash("error", "Your Entered Current Password is Wrong");
      res.redirect("/changePassword");
      return;
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const updatedUser = await User.findByIdAndUpdate(id,
        { password: hashedPassword },
        { new: true },
      );
      req.flash("success", "Password Changed Successfully...!");
      res.redirect("/profile");
      return;
    }
  },
};

module.exports = profileController;