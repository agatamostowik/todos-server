import { addTodo } from "../models/index.js";

export const addTodoController = async (req, res) => {
  const label = req.body.label;
  const ancestorsIds = req.body.ancestorsIds;
  const parentId = JSON.stringify(req.body.parentId);

  const typedAncestorsIds =
    ancestorsIds.length === 0 ? "[]::integer[]" : JSON.stringify(ancestorsIds);

  try {
    const user = await req.user;

    console.log("user:", user);
    const addTodoResponse = await addTodo(
      label,
      typedAncestorsIds,
      parentId,
      user.id
    );

    res.json(addTodoResponse);
    console.log("Endpoint responded with:", addTodoResponse);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
