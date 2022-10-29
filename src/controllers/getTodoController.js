import { getTodos } from "../models/index.js";

export const getTodoController = async (req, res) => {
  const result = await getTodos();

  res.json(result);
};
