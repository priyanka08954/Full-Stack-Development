const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Fallback route for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Initialize SQLite database
const db = new sqlite3.Database("bookings.db", (err) => {
  if (err) console.error("Database connection error:", err.message);
  else console.log("Connected to SQLite database.");
});

// Create bookings table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    name TEXT,
    email TEXT,
    date TEXT,
    message TEXT
  )
`);

// POST endpoint: save a booking
app.post("/api/bookings", (req, res) => {
  const { type, name, email, date, message } = req.body;

  if (!type || !name || !email || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `INSERT INTO bookings (type, name, email, date, message) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [type, name, email, date, message], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// GET endpoint: get all bookings
app.get("/api/bookings", (req, res) => {
  const sql = `SELECT * FROM bookings ORDER BY id DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Handle unknown routes (optional)
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
