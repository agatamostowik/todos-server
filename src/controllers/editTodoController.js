import { editTodo, selectTodoById } from "../models/index.js";

export const editTodoController = async (req, res) => {
  const todoId = req.params.todoId;
  const label = req.body.label;
  const status = req.body.status;

  try {
    if (status) {
      console.log("Starting sending query for status column with:", status);
      await editTodo(todoId, "status", status);
    }

    if (label) {
      console.log("Starting sending query for label column with:", label);
      await editTodo(todoId, "label", label);
    }

    const result = await selectTodoById(todoId);

    res.json(result);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
