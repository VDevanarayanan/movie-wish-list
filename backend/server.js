const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;
const FAVORITES_FILE = path.join(__dirname, "favorites.json");

// ✅ CORS config
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// ✅ Load favorites from file
function loadFavorites() {
  try {
    const data = fs.readFileSync(FAVORITES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// ✅ Save favorites to file
function saveFavorites(data) {
  fs.writeFileSync(FAVORITES_FILE, JSON.stringify(data, null, 2));
}

let favorites = loadFavorites();

// ✅ Add to favorites
app.post("/favorites", (req, res) => {
  const movie = req.body;
  if (!favorites.some(m => m.id === movie.id)) {
    favorites.push(movie);
    saveFavorites(favorites);
    console.log("Added to favorites:", movie.title);
    res.status(201).json({ message: "Movie added", movie });
  } else {
    res.status(409).json({ message: "Movie already in favorites" });
  }
});

// ✅ Get all favorites
app.get("/favorites", (req, res) => {
  res.json({ favorites });
});

// ✅ Remove from favorites
app.delete("/favorites/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const initialLength = favorites.length;
  favorites = favorites.filter(movie => movie.id !== movieId);

  if (favorites.length < initialLength) {
    saveFavorites(favorites);
    console.log(`Removed movie with ID: ${movieId}`);
    res.json({ message: "Movie removed" });
  } else {
    res.status(404).json({ message: "Movie not found in favorites" });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
