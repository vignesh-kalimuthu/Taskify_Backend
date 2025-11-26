const Todo = require("../models/Todo");

exports.getTodos = (req, res) => {
  Todo.getTodos(req.user.id, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
};

exports.getStatusCount = (req, res) => {
  console.log("UserID API called", req.user.id);
  Todo.getStatusCount(req.user.id, (err, results) => {
    console.log("getCOunt", results);
    if (err) throw err;
    res.status(200).json(results);
  });
};

exports.getByTodoId = (req, res) => {
  const { id } = req.params;

  Todo.getByTodoId(id, req.user.id, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  Todo.updateTodo(id, req.user.id, updates, (err, result) => {
    if (err) return res.status(500).json({ error: "Update failed" });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.json({ message: "Todo updated successfully" });
  });
};

exports.createTodo = (req, res) => {
  const { title, description, category, priority } = req.body;

  Todo.createTodo(
    req.user.id,
    title,
    description,
    category,
    priority,
    (err, result) => {
      if (err) throw err;
      res.status(201).json({
        message: "Todo created successfully",
        todoId: result.insertId,
      });
    }
  );
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  Todo.deleteTodo(id, req.user.id, (err) => {
    if (err) throw err;
    res.json({ message: "Todo deleted successfully" });
  });
};
