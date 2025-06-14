const express = require('express');
const router = express.Router();

// Example: In-memory users array (replace with your DB logic)
const users = [];

router.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered.' });
  }
  // Save user (replace with DB logic)
  users.push({ name, email, password });
  res.status(201).json({ message: 'User registered successfully.' });
});

module.exports = router;