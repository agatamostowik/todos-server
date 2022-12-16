import { editTodo, selectTodoById } from "../models/index.js";

export const editTodoController = async (req, res) => {
  // const todoId = req.params.todoId;
  // const label = req.body.label;
  // const status = req.body.status;
  console.log(req.body);

  res.status(200);

  // POST
  [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
    { id: "new_tag", name: "cis" },
  ][
    // DB tag:
    ({ id: 1, name: "foo" }, { id: 2, name: "bar" }, { id: 3, name: "fiz" })
  ];

  // try {
  //   if (status) {
  //     console.log("Starting sending query for status column with:", status);
  //     await editTodo(todoId, "status", status);
  //   }

  //   if (label) {
  //     console.log("Starting sending query for label column with:", label);
  //     await editTodo(todoId, "label", label);
  //   }

  //   const result = await selectTodoById(todoId);

  //   res.json(result);
  // } catch (error) {
  //   console.log("ERROR:", error);
  // }
};
