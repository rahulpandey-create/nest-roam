const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const uploadDir = path.join(__dirname, "..", "uploads", "blogs");
fs.mkdirSync(uploadDir, { recursive: true });

const extensionByMime = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

module.exports = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadDir),
    filename: (_req, file, callback) => {
      const extension = extensionByMime[file.mimetype];
      callback(null, `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!extensionByMime[file.mimetype]) {
      return callback(new Error("Only JPG, PNG, WEBP and AVIF images are allowed."));
    }
    callback(null, true);
  },
});
