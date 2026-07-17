const User = require("../models/User.js");

const adminController = {
  viewUsers: async (req, res) => {
    const users = await User.find();
    res.render("viewUsers", { users , activePage: "viewUser"  });
  },

  updateUserRole: async (req, res) => {
    const { role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { role });
    req.flash("success", "Role updated successfully");
    res.redirect("/viewUsers");
  },
};

module.exports = adminController;
