const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).send("Unauthorized - No user role found");
    }

    const userRole = req.user.role.toLowerCase().trim();
    const lowerAllowedRoles = allowedRoles.map((role) =>
      role.toLowerCase().trim(),
    );

    if (lowerAllowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).send("Unauthorized - You don't have permission");
    }
  };
};

module.exports = checkRole;
