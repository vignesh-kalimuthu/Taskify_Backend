const db = require("../config/db");

exports.getTodos = (userId, callback) => {
  db.query("SELECT * FROM todos WHERE user_id = ?", [userId], callback);
};

exports.getStatusCount = (userId, callback) => {
  db.query(
    "SELECT status, COUNT(*) AS count FROM todos WHERE user_id = ? GROUP BY status",
    [userId],
    callback
  );
};

exports.getByTodoId = (id, userId, callback) => {
  db.query(
    "SELECT * FROM todos WHERE id = ? AND user_id = ?",
    [id, userId],
    callback
  );
};

exports.updateTodo = (id, userId, updates, callback) => {
  const fields = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(updates);

  const sql = `UPDATE todos SET ${fields} WHERE id = ? AND user_id = ?`;

  db.query(sql, [...values, id, userId], callback);
};

exports.createTodo = (
  userId,
  title,
  description,
  category,
  priority,

  callback
) => {
  db.query(
    "INSERT INTO todos (user_id, title, description, category, priority) VALUES (?, ?, ?, ?, ?)",
    [userId, title, description, category, priority],
    callback
  );
};

exports.deleteTodo = (id, userId, callback) => {
  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId],
    callback
  );
};
