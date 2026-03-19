const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "TrustScan backend is running",
    time: new Date().toISOString()
  });
});

app.post("/api/scan", (req, res) => {
  res.json({
    success: true,
    message: "Scan endpoint ready",
    result: {
      prediction: "AI Generated",
      confidence: 98.2
    }
  });
});

app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TrustScan running at http://localhost:${PORT}`);
});