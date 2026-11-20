const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 8 * 60 * 60 * 1000,
});

exports.login = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required." });

    const db = require("../config/db");
    const [rows] = await db.execute(
      "SELECT id, name, email, password_hash FROM admins WHERE email = ? LIMIT 1",
      [email]
    );
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h", issuer: "nestroam-api", audience: "nestroam-admin" }
    );
    res.cookie("nestroam_admin", token, cookieOptions());
    return res.json({ success: true, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (error) { next(error); }
};

exports.me = (req, res) => res.json({
  success: true,
  admin: { id: req.admin.id, name: req.admin.name, email: req.admin.email },
});

exports.logout = (_req, res) => {
  res.clearCookie("nestroam_admin", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
  res.json({ success: true, message: "Logged out." });
};
