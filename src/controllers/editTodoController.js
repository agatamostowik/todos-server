import { editTodo, selectTodoById } from "../models/index.js";

export const editTodoController = async (req, res) => {
  const todoId = req.params.todoId;
  const label = req.body.label;
  const status = req.body.status;

  try {
    if (status) {
      console.log("Starting sending query for status column with:", status);
      const statusChangeResponse = await editTodo(todoId, label);
      console.log("DB responded with:", statusChangeResponse);
    }

    if (label) {
      console.log("Starting sending query for label column with:", label);
      const labelChangeResponse = await editTodo(todoId, label);
      console.log("DB responded with:", labelChangeResponse);
    }

    const result = await selectTodoById(todoId);

    res.json(result);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
