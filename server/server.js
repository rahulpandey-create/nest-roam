require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const enquiryRoutes = require("./routes/enquiryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
// Add your allowed origins here
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as server-to-server requests and health checks.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});