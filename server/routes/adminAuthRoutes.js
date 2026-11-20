const router = require("express").Router();
const { login, logout, me } = require("../controllers/adminAuthController");
const auth = require("../middleware/adminAuth");
const limiter = require("../middleware/adminLoginLimiter");
router.post("/login", limiter, login);
router.post("/logout", auth, logout);
router.get("/me", auth, me);
module.exports = router;
