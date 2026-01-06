// routes.js
const express = require("express");
const router = express.Router();
const db = require("./db"); 

// ===== REGISTER =====
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ message: "Registration successful" });
  });
});

// ===== LOGIN =====
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result[0];
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful" });
  });
});

// ===== RESET PASSWORD =====
router.post("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password required" });
  }

  const sql = "UPDATE users SET password=? WHERE email=?";
  db.query(sql, [newPassword, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Email not found" });

    res.json({ message: "Password reset successful" });
  });
});

module.exports = router; 
