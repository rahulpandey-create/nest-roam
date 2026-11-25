const rateLimit = require("express-rate-limit");
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Try again in 15 minutes." },
});
