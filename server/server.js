
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const enquiryRoutes = require("./routes/enquiryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "https://nestroamholidays.com",
  "https://www.nestroamholidays.com",
];

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nestroam API is running.",
  });
});

app.use("/api/enquiries", enquiryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
