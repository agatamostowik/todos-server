import { getTodos } from "../models/index.js";

export const getTodoController = async (req, res) => {
  const user = await req.user;
  console.log("user: ", user);
  const result = await getTodos(user.id);

  res.json(result);
};
