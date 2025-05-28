const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

// Replace this with your own MongoDB Atlas URI


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

app.post("/api/location", async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: "Location saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save location." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
