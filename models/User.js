const db = require("../config/db");

exports.findByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

exports.findById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

exports.findCurrentPassword = (id, callback) => {
  db.query("SELECT password FROM users WHERE id = ?", [id], callback);
};
exports.updatePassword = (id, hash, callback) => {
  db.query("UPDATE users SET password = ? WHERE id = ?", [hash, id], callback);
};

exports.createUser = (name, email, hash, callback) => {
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    callback
  );
};
