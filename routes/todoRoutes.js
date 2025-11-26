const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  deleteTodo,
  getByTodoId,
  updateTodo,
  getStatusCount,
} = require("../controllers/todoController");

router.get("/", auth, getTodos);
router.post("/", auth, createTodo);
router.delete("/:id", auth, deleteTodo);
router.get("/:id", auth, getByTodoId);
router.patch("/:id", auth, updateTodo);
router.get("/status/count/", auth, getStatusCount);

module.exports = router;
