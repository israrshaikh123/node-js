const checkRole = (allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.role)) {
    return next();
  }
  res.status(403).json({ message: "Unauthorized - You don't have permission" });
};

module.exports = checkRole;