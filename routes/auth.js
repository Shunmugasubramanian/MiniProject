const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Secret for JWT
const SECRET = "canteen-secret";

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.json({ success: false, message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.json({ success: false, message: "Registration error.",err });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password!" });

    const token = jwt.sign({ id: user._id, role: "user" }, SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, role: "user", name: user.username });
  } catch (err) {
    res.json({ success: false, message: "Login error." });
  }
});

module.exports = router;

router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.json({ success: false, message: 'Email not found' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ success: true });
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;