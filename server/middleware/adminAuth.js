const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  const token = req.cookies?.nestroam_admin || req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ success: false, message: "Authentication required." });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }
};
