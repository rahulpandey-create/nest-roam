const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === "LIMIT_FILE_SIZE") return res.status(400).json({ success: false, message: "Image must be 5 MB or smaller." });
  if (err.message?.startsWith("Only JPG")) return res.status(400).json({ success: false, message: err.message });
  if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") return res.status(400).json({ success: false, message: "Upload one image at a time." });

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};

module.exports = errorHandler;