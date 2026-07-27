const jwt = require('jsonwebtoken');

// Verifies token if present, attaches decoded user to req.user and res.locals.user
// Does NOT block access — use protect() for that.
const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  req.user = null;
  res.locals.user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, username, role }
      res.locals.user = decoded;
    } catch (err) {
      // invalid/expired token -> treat as logged out
      res.clearCookie('token');
    }
  }
  next();
};

// Blocks access if not authenticated
const protect = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

// Restricts access to specific roles, e.g. authorizeRoles('admin')
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).render('error', {
        message: 'Access denied: insufficient permissions',
        user: req.user,
      });
    }
    next();
  };
};

module.exports = { attachUser, protect, authorizeRoles };
