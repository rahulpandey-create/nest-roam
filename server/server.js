require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const enquiryRoutes = require("./routes/enquiryRoutes");
const errorHandler = require("./middleware/errorHandler");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const packageRoutes = require("./routes/packageRoutes");

const app = express();

const allowedOrigins = [
  "https://nestroamholidays.com",
  "https://www.nestroamholidays.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads"), { maxAge: "7d", immutable: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nestroam API is running.",
  });
});

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/packages", packageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
