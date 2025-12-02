const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const db = require("../config/db");

exports.changePassword = (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  User.findCurrentPassword(userId, async (err, results) => {
    if (err) throw err;
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(oldPassword, results[0].password);

    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });
    const hashed = await bcrypt.hash(newPassword, 10);
    console.log("Hashed new password:", hashed);

    User.updatePassword(userId, hashed, (err2) => {
      if (err2) throw err2;
      res.json({ message: "Password updated successfully" });
    });
  });
};

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (results.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    User.createUser(name, email, hash, (err) => {
      if (err) throw err;

      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};

exports.me = (req, res) => {
  const userId = req.user.id;
  console.log("Authenticated user ID:", userId);

  User.findById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id, name, email } = results[0];

    console.log("Retrieved user:", { id, name, email });
    res.status(200).json({ id, name, email });
  });
};
