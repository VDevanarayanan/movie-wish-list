require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

// ✅ Get URI from environment
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB (you can remove the options — they are deprecated)
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Movie schema
const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  poster_path: String,
  release_date: String,
});

const Favorite = mongoose.model("Favorite", movieSchema);

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// ✅ Routes

app.post("/favorites", async (req, res) => {
  try {
    const exists = await Favorite.findOne({ id: req.body.id });
    if (exists) {
      return res.status(409).json({ message: "Movie already in favorites" });
    }

    const movie = new Favorite(req.body);
    await movie.save();
    console.log("Added to favorites:", movie.title);
    res.status(201).json({ message: "Movie added", movie });
  } catch (err) {
    console.error("Error adding movie:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving favorites" });
  }
});

app.delete("/favorites/:id", async (req, res) => {
  try {
    const result = await Favorite.deleteOne({ id: parseInt(req.params.id, 10) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Movie not found in favorites" });
    }
    console.log("Removed movie with ID:", req.params.id);
    res.json({ message: "Movie removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing movie" });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
