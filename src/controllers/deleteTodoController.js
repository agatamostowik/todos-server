import { deleteTodo } from "../models/index.js";

export const deleteTodoController = async function (req, res) {
  const todoId = req.params.todoId;

  try {
    console.log("Starting sending query for deletion of todo id:", todoId);
    const todoDeleteResponse = await deleteTodo(todoId);

    res.json(todoDeleteResponse);
    console.log("DB responded with:", todoDeleteResponse);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
